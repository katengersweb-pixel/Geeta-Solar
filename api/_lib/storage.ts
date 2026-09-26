import { put, list } from '@vercel/blob';

export const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface HeroImageRecord {
  key: 'hero-image';
  url: string;
  updatedAt: string | null;
  isDefault?: boolean;
}

// In-memory fallback for local dev when BLOB_READ_WRITE_TOKEN is not yet set
let localDevHeroRecord: HeroImageRecord | null = null;

/**
 * Validates file buffer, MIME type, and size
 */
export function validateImageUpload(
  buffer: Buffer,
  declaredMimeType: string,
  fileName: string
): { valid: boolean; error?: string; extension?: string; mimeType?: AllowedMimeType } {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Empty file received' };
  }
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds maximum limit of 5 MB' };
  }
  const normalizedMime = declaredMimeType.toLowerCase().trim();
  if (!ALLOWED_MIME_TYPES.includes(normalizedMime as AllowedMimeType)) {
    return { valid: false, error: `Invalid file type: ${declaredMimeType}. Only JPG, JPEG, PNG, and WebP are allowed.` };
  }
  const extMatch = fileName.toLowerCase().match(/\.(jpe?g|png|webp)$/);
  if (!extMatch) {
    return { valid: false, error: 'Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.' };
  }
  let ext = extMatch[1];
  if (ext === 'jpeg') ext = 'jpg';
  if (normalizedMime === 'image/jpeg' || ext === 'jpg') {
    if (buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
      return { valid: false, error: 'Invalid JPEG file content' };
    }
  } else if (normalizedMime === 'image/png' || ext === 'png') {
    if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4e || buffer[3] !== 0x47) {
      return { valid: false, error: 'Invalid PNG file content' };
    }
  } else if (normalizedMime === 'image/webp' || ext === 'webp') {
    const isRiff = buffer.subarray(0, 4).toString('ascii') === 'RIFF';
    const isWebp = buffer.subarray(8, 12).toString('ascii') === 'WEBP';
    if (!isRiff || !isWebp) {
      return { valid: false, error: 'Invalid WebP file content' };
    }
  }
  return { valid: true, extension: ext, mimeType: normalizedMime as AllowedMimeType };
}

/**
 * Retrieves the current Hero image record from Vercel Blob.
 *
 * FIX: Old approach overwrote the same "hero-meta.json" file path, causing
 * Vercel CDN to serve stale cached content after each update.
 * New approach: lists ALL metadata files under "hero/meta/", sorts by
 * uploadedAt descending, and fetches the most recent one by its unique URL.
 * Because each metadata file has a unique timestamped path/URL, CDN never
 * serves stale data.
 */
export function getHeroImageRecordAsync(): Promise<HeroImageRecord> {
  return (async () => {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      try {
        const { blobs } = await list({ prefix: 'hero/meta/', token: blobToken });
        if (blobs && blobs.length > 0) {
          // Sort by uploadedAt descending — most recent first
          blobs.sort((a, b) => {
            const tA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
            const tB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
            return tB - tA;
          });
          const latestMeta = blobs[0];
          // Each metadata file has a unique URL (timestamped path), so CDN
          // never serves stale content — always a fresh unique URL.
          const response = await fetch(latestMeta.url, { cache: 'no-store' });
          if (response.ok) {
            const data = (await response.json()) as HeroImageRecord;
            if (data && data.url) {
              return {
                key: 'hero-image',
                url: data.url,
                updatedAt: data.updatedAt || latestMeta.uploadedAt?.toISOString() || new Date().toISOString(),
                isDefault: false,
              };
            }
          }
        }
      } catch (err) {
        console.error('Error fetching hero image record from Vercel Blob:', err);
      }
    }
    if (localDevHeroRecord) return localDevHeroRecord;
    return { key: 'hero-image', url: DEFAULT_HERO_IMAGE, updatedAt: null, isDefault: true };
  })();
}

/**
 * Saves a new Hero image to Vercel Blob and updates the persistent metadata record.
 *
 * FIX: Metadata is now saved as a unique timestamped file "hero/meta/<timestamp>.json"
 * instead of always overwriting "hero/hero-meta.json". This gives every metadata write
 * a brand-new CDN URL — no stale cache issues ever.
 */
export async function saveHeroImageToBlob(
  buffer: Buffer,
  mimeType: AllowedMimeType,
  ext: string
): Promise<HeroImageRecord> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const timestamp = Date.now();
  const blobPath = `hero/hero-${timestamp}.${ext}`;
  if (blobToken) {
    // 1. Upload the versioned image blob
    const imageBlob = await put(blobPath, buffer, {
      access: 'public',
      contentType: mimeType,
      token: blobToken,
      addRandomSuffix: false,
    });
    const record: HeroImageRecord = {
      key: 'hero-image',
      url: imageBlob.url,
      updatedAt: new Date().toISOString(),
      isDefault: false,
    };
    // 2. Save metadata as a NEW unique timestamped file — not overwrite same path.
    //    hero/meta/<timestamp>.json has a unique URL every time = no CDN cache issues.
    await put(`hero/meta/${timestamp}.json`, JSON.stringify(record), {
      access: 'public',
      contentType: 'application/json',
      token: blobToken,
      addRandomSuffix: false,
    });
    return record;
  }
  // Local development fallback
  const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;
  localDevHeroRecord = {
    key: 'hero-image',
    url: base64Data,
    updatedAt: new Date().toISOString(),
    isDefault: false,
  };
  return localDevHeroRecord;
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticated } from './_lib/auth';
import {
  getHeroImageRecordAsync,
  validateImageUpload,
  saveHeroImageToBlob,
} from './_lib/storage';
import { parseMultipartForm } from './_lib/multipart';

// Disable standard Vercel body parser for multipart file upload stream
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // 1. GET /api/hero-image -> Public read
  if (req.method === 'GET') {
    try {
      const record = await getHeroImageRecordAsync();
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(record);
    } catch (err: any) {
      console.error('Error fetching hero image record:', err);
      return res.status(500).json({
        error: 'Failed to retrieve hero image record',
      });
    }
  }

  // 2. POST /api/hero-image -> Protected admin update
  if (req.method === 'POST') {
    // A. Verify admin authentication
    if (!isAuthenticated(req)) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Admin authentication required to update hero image.',
      });
    }

    try {
      // B. Parse incoming multipart form
      const { files } = await parseMultipartForm(req);

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No image file uploaded. Please choose a valid image file.',
        });
      }

      const file = files[0];

      // C. Server-side validation (file type, size, magic bytes)
      const validation = validateImageUpload(file.buffer, file.mimeType, file.fileName);
      if (!validation.valid || !validation.mimeType || !validation.extension) {
        return res.status(400).json({
          success: false,
          error: validation.error || 'Invalid file format or size.',
        });
      }

      // D. Upload to Vercel Blob and update persistent metadata
      const newRecord = await saveHeroImageToBlob(
        file.buffer,
        validation.mimeType,
        validation.extension
      );

      res.setHeader('Cache-Control', 'no-store, max-age=0');
      return res.status(200).json({
        success: true,
        message: 'Hero image updated successfully.',
        data: newRecord,
      });
    } catch (err: any) {
      console.error('Error updating hero image:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to update hero image.',
      });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}

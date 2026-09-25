import type { IncomingMessage } from 'http';
import busboy from 'busboy';

export interface ParsedFile {
  fieldName: string;
  fileName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface ParsedMultipart {
  fields: Record<string, string>;
  files: ParsedFile[];
}

/**
 * Parses multipart/form-data request stream into fields and file buffers
 */
export function parseMultipartForm(req: IncomingMessage): Promise<ParsedMultipart> {
  return new Promise((resolve, reject) => {
    const fields: Record<string, string> = {};
    const files: ParsedFile[] = [];

    const contentType = req.headers['content-type'] || req.headers['Content-Type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return reject(new Error('Content-Type must be multipart/form-data'));
    }

    const bb = busboy({
      headers: req.headers,
      limits: {
        fileSize: 6 * 1024 * 1024, // 6 MB max to catch slightly over-limit
        files: 1, // Only 1 hero image file
      },
    });

    bb.on('field', (name, val) => {
      fields[name] = val;
    });

    bb.on('file', (fieldName, fileStream, info) => {
      const { filename, mimeType } = info;
      const chunks: Buffer[] = [];

      fileStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      fileStream.on('end', () => {
        files.push({
          fieldName,
          fileName: filename,
          mimeType,
          buffer: Buffer.concat(chunks),
        });
      });
    });

    bb.on('error', (err) => {
      reject(err);
    });

    bb.on('finish', () => {
      resolve({ fields, files });
    });

    // Handle stream piping
    // If req already has a raw body or is a stream
    if ((req as any).rawBody) {
      bb.end((req as any).rawBody);
    } else {
      req.pipe(bb);
    }
  });
}

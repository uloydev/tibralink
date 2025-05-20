import fs from 'fs';
import path from 'path';

export async function GET({ params }) {
    const filename = params.filename;
    const filePath = path.resolve('uploads', filename);

    if (!fs.existsSync(filePath)) {
        return new Response('Not found', { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'application/octet-stream';

    return new Response(file, {
        headers: {
            'Content-Type': contentType
        }
    });
}
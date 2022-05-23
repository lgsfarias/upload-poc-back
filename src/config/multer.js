import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const muterConfig = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, muterConfig.dest);
        },
        filename: (req, file, cb) => {
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter(req, file, callback) {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if (!allowedMimes.includes(file.mimetype)) {
            return callback(new Error('Invalid file type'));
        }

        callback(null, true);
    },
};

export default muterConfig;

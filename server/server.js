import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${extension}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed.'));
    }
  }
});

// Backend health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DIMAS backend is running!'
  });
});

// Video upload
app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No video was uploaded.'
    });
  }

  res.json({
    success: true,
    message: 'Video uploaded successfully!',
    video: {
      id: path.parse(req.file.filename).name,
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`DIMAS backend running on port ${PORT}`);
});

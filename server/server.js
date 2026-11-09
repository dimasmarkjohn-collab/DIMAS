
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${extension}`);
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

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DIMAS backend is running!'
  });
});

app.post('/api/upload', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No video was uploaded.'
    });
  }

  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: 'Supabase is not configured.'
      });
    }

    const fileBuffer = await fs.promises.readFile(req.file.path);

    const { data, error } = await supabase.storage
      .from('dimas-videos')
      .upload(req.file.filename, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) throw error;

    return res.json({
      success: true,
      message: 'Video uploaded successfully!',
      video: {
        id: path.parse(req.file.filename).name,
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        storagePath: data.path
      }
    });

  } catch (error) {
    console.error('Supabase upload error:', {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
      hint: error.hint
    });

    return res.status(500).json({
      success: false,
      message: 'Video upload failed. Please try again.'
    });

  } finally {
    if (req.file?.path) {
      await fs.promises.unlink(req.file.path).catch(() => {});
    }
  }
});

app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`DIMAS backend running on port ${PORT}`);
});

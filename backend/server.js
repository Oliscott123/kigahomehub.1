const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const homesRouter = require('./routes/homes');
const authRouter = require('./routes/auth');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

app.use('/api/auth', authRouter);
app.use('/api/homes', homesRouter);

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'Kigali Home Hub backend is running' });
});

app.get('/api/health', (req, res) => {
  res.send({ status: 'ok' });
});

db.init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database', error);
    process.exit(1);
  });

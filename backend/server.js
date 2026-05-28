const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const homesRouter = require('./routes/homes');
const authRouter = require('./routes/auth');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRouter);
app.use('/api/homes', homesRouter);

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'Kigali Home Hub backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../db');
const authenticate = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${suffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const parseImages = (row) => {
  const images = row.images ? JSON.parse(row.images) : [];
  return { ...row, images };
};

router.get('/', async (req, res) => {
  try {
    const { location, priceMin, priceMax } = req.query;
    let query = 'SELECT * FROM homes';
    const params = [];
    const filters = [];

    if (location) {
      filters.push('location LIKE ?');
      params.push(`%${location}%`);
    }
    if (priceMin) {
      filters.push('price >= ?');
      params.push(priceMin);
    }
    if (priceMax) {
      filters.push('price <= ?');
      params.push(priceMax);
    }
    if (filters.length) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    const [rows] = await pool.query(query, params);
    res.json(rows.map(parseImages));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load homes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM homes WHERE id = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.json(parseImages(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load home' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, location, price, bedrooms, bathrooms, images } = req.body;
    const [result] = await pool.query(
      'INSERT INTO homes (title, description, location, price, bedrooms, bathrooms, images) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, location, price, bedrooms, bathrooms, JSON.stringify(images || [])]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create home' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, location, price, bedrooms, bathrooms, images } = req.body;
    await pool.query(
      'UPDATE homes SET title = ?, description = ?, location = ?, price = ?, bedrooms = ?, bathrooms = ?, images = ? WHERE id = ?',
      [title, description, location, price, bedrooms, bathrooms, JSON.stringify(images || []), req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update home' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM homes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete home' });
  }
});

router.post('/:id/images', authenticate, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const [rows] = await pool.query('SELECT images FROM homes WHERE id = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Home not found' });
    }

    const currentImages = rows[0].images ? JSON.parse(rows[0].images) : [];
    currentImages.push(imageUrl);

    await pool.query('UPDATE homes SET images = ? WHERE id = ?', [JSON.stringify(currentImages), req.params.id]);
    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.delete('/:id/images', authenticate, async (req, res) => {
  try {
    const { index, imageUrl } = req.body;
    const [rows] = await pool.query('SELECT images FROM homes WHERE id = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Home not found' });
    }

    const currentImages = rows[0].images ? JSON.parse(rows[0].images) : [];
    let updatedImages = currentImages;

    if (typeof index === 'number') {
      if (index < 0 || index >= currentImages.length) {
        return res.status(400).json({ error: 'Invalid index' });
      }
      updatedImages = currentImages.filter((_, idx) => idx !== index);
    } else if (imageUrl) {
      updatedImages = currentImages.filter((url) => url !== imageUrl);
    } else {
      return res.status(400).json({ error: 'index or imageUrl required' });
    }

    await pool.query('UPDATE homes SET images = ? WHERE id = ?', [JSON.stringify(updatedImages), req.params.id]);

    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', imageUrl);
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ images: updatedImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;

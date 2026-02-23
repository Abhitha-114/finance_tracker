const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello from Finance Tracker backend ✅');
});

// naya
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT current_user, current_database()');
    console.log('DB TEST RESULT:', result.rows[0]); // debug line
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error: ', err);
    res.status(500).json({ error: 'DB error' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

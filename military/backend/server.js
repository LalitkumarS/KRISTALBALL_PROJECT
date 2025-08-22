import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import purchasesRouter from './routes/purchases.js';
import assignmentsRouter from './routes/assignments.js';
import assetsRouter from './routes/assets.js';
import Asset from './models/Asset.js';
import Purchase from './models/Purchase.js';
import Assignment from './models/Assignment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'; // allow all origins if not specified

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: 'MAMS backend running' });
});

// API routes
app.use('/api/purchases', purchasesRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/assets', assetsRouter);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not set in environment variables');
  process.exit(1);
}

// Seed sample data if empty
async function seedIfEmpty() {
  if (process.env.SEED_SAMPLE_DATA !== 'true') return;

  const assetCount = await Asset.countDocuments();
  if (assetCount === 0) {
    await Asset.insertMany([
      { name: 'Rifle', type: 'Weapon', quantity: 120 },
      { name: 'Helmet', type: 'Gear', quantity: 300 },
      { name: 'Night Vision Goggles', type: 'Optics', quantity: 45 },
      { name: 'Radio', type: 'Comms', quantity: 80 }
    ]);
  }

  const purchaseCount = await Purchase.countDocuments();
  if (purchaseCount === 0) {
    await Purchase.insertMany([
      { item: 'Rifle', quantity: 50, date: new Date('2025-08-01') },
      { item: 'Helmet', quantity: 100, date: new Date('2025-08-05') },
      { item: 'Radio', quantity: 20, date: new Date('2025-08-10') }
    ]);
  }

  const assignmentCount = await Assignment.countDocuments();
  if (assignmentCount === 0) {
    await Assignment.insertMany([
      { date: new Date('2025-08-12'), personnel: 'Alpha Squad', equipmentType: 'Rifle', quantity: 15 },
      { date: new Date('2025-08-13'), personnel: 'Bravo Squad', equipmentType: 'Helmet', quantity: 30 },
      { date: new Date('2025-08-15'), personnel: 'Comms Team', equipmentType: 'Radio', quantity: 10 }
    ]);
  }
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('MongoDB connected');
    await seedIfEmpty();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

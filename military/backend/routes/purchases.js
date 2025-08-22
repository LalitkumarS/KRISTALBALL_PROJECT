import express from 'express';
import Purchase from '../models/Purchase.js';
import Asset from '../models/Asset.js';


const router = express.Router();


// GET /purchases → list all purchases
router.get('/', async (req, res) => {
try {
const purchases = await Purchase.find().sort({ date: -1, createdAt: -1 });
res.json(purchases);
} catch (err) {
res.status(500).json({ error: 'Failed to fetch purchases' });
}
});


// POST /purchases → add a purchase & increase asset stock
router.post('/', async (req, res) => {
try {
const { item, quantity, date } = req.body;
if (!item || !quantity) return res.status(400).json({ error: 'item and quantity are required' });


const purchase = await Purchase.create({ item, quantity, date: date ? new Date(date) : new Date() });


// Upsert the Asset by name and increment quantity
await Asset.findOneAndUpdate(
{ name: item },
{ $inc: { quantity: quantity }, $setOnInsert: { type: 'General' } },
{ upsert: true, new: true }
);


res.status(201).json(purchase);
} catch (err) {
res.status(500).json({ error: 'Failed to create purchase' });
}
});


export default router;
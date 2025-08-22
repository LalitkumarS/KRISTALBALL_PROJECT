import express from 'express';
import Asset from '../models/Asset.js';


const router = express.Router();


// GET /assets → list assets
router.get('/', async (req, res) => {
try {
const assets = await Asset.find().sort({ name: 1 });
res.json(assets);
} catch (err) {
res.status(500).json({ error: 'Failed to fetch assets' });
}
});


// PUT /assets/:id → update asset quantity
router.put('/:id', async (req, res) => {
try {
const { quantity, name, type } = req.body;
const update = {};
if (quantity !== undefined) update.quantity = quantity;
if (name !== undefined) update.name = name;
if (type !== undefined) update.type = type;


const asset = await Asset.findByIdAndUpdate(req.params.id, update, { new: true });
if (!asset) return res.status(404).json({ error: 'Asset not found' });
res.json(asset);
} catch (err) {
res.status(500).json({ error: 'Failed to update asset' });
}
});


export default router;
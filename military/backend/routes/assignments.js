import express from 'express';
import Assignment from '../models/Assignment.js';
import Asset from '../models/Asset.js';


const router = express.Router();


// GET /assignments → list all assignments
router.get('/', async (req, res) => {
try {
const assignments = await Assignment.find().sort({ date: -1, createdAt: -1 });
res.json(assignments);
} catch (err) {
res.status(500).json({ error: 'Failed to fetch assignments' });
}
});


// POST /assignments → add an assignment & decrease asset stock (with validation)
router.post('/', async (req, res) => {
try {
const { date, personnel, equipmentType, quantity } = req.body;
if (!personnel || !equipmentType || !quantity) {
return res.status(400).json({ error: 'personnel, equipmentType, and quantity are required' });
}


// Check stock first
const asset = await Asset.findOne({ name: equipmentType });
if (!asset) {
return res.status(400).json({ error: `Asset '${equipmentType}' not found` });
}
if (asset.quantity < quantity) {
return res.status(400).json({ error: `Insufficient stock. Available: ${asset.quantity}` });
}


const assignment = await Assignment.create({
date: date ? new Date(date) : new Date(),
personnel,
equipmentType,
quantity
});


await Asset.updateOne({ _id: asset._id }, { $inc: { quantity: -quantity } });


res.status(201).json(assignment);
} catch (err) {
res.status(500).json({ error: 'Failed to create assignment' });
}
});


export default router;
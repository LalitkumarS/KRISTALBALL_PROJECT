import mongoose from 'mongoose';


const purchaseSchema = new mongoose.Schema(
{
item: { type: String, required: true },
quantity: { type: Number, required: true, min: 1 },
date: { type: Date, default: Date.now }
},
{ timestamps: true }
);


export default mongoose.model('Purchase', purchaseSchema);
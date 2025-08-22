import mongoose from 'mongoose';


const assetSchema = new mongoose.Schema(
{
name: { type: String, required: true, unique: true },
type: { type: String, default: 'General' },
quantity: { type: Number, default: 0 }
},
{ timestamps: true }
);


export default mongoose.model('Asset', assetSchema);
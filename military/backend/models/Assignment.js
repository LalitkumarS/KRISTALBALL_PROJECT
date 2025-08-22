import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema(
{
date: { type: Date, default: Date.now },
personnel: { type: String, required: true },
equipmentType: { type: String, required: true },
quantity: { type: Number, required: true, min: 1 }
},
{ timestamps: true }
);


export default mongoose.model('Assignment', assignmentSchema);
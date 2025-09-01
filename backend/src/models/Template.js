import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Template', templateSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface Goal extends Document {
  userId: string;
  title: string;
  type: string;
  target: number;
  deadline: Date;
  progress: number;
}

const goalSchema: Schema<Goal> = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  type: { type: String, required: true, index: true },
  target: { type: Number, required: true, min: 0 },
  deadline: { type: Date, required: true },
  progress: { type: Number, default: 0 },
}, { timestamps: true });


const Goal = mongoose.model<Goal>('Goal', goalSchema);
export default Goal;
```
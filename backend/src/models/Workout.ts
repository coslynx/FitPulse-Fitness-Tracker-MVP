import mongoose, { Schema, Document, SchemaTypes } from 'mongoose';

interface Workout extends Document {
  userId: SchemaTypes.ObjectId;
  date: Date;
  type: string;
  duration: number;
  distance?: number;
  caloriesBurned?: number;
}

const workoutSchema: Schema<Workout> = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true, min: 0 },
  distance: { type: Number, min: 0 },
  caloriesBurned: { type: Number, min: 0 },
}, { timestamps: true });

const Workout = mongoose.model<Workout>('Workout', workoutSchema);
export default Workout;

```
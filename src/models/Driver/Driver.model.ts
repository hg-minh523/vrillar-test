import { Schema, model } from 'mongoose';
export interface driverType {
  _id?: Number;
  rank?: string;
  points: string;
  nationality: string;
  name: string;
  team: string;
  year?: number;
}

// 2. Create a Schema corresponding to the document interface.
const driverSchema = new Schema<driverType>({
  name: { type: String, required: true },
  points: {type: String, require: false},
  nationality: String,
  team: String,
  year: Number,
  rank: String,
});
// plugin
export const Driver = model<driverType>('Driver', driverSchema);
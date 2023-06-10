import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface driverType {
  rank: string;
  point: string;
  name: string;
  team: string;
  // avatar?: string;

}

// 2. Create a Schema corresponding to the document interface.
const driverSchema = new Schema<driverType>({
  name: { type: String, required: true },
  point: {type: String, require: false},
  team: String,
  rank: String,
  // avatar: String
});


export const Driver = model<driverType>('Driver', driverSchema);
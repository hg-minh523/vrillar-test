import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Schedule {
  rank: string;
  point: string;
  name: string;
  team: string;
  // avatar?: string;

}

// 2. Create a Schema corresponding to the document interface.
const scheduleSchema = new Schema<Schedule>({
  name: { type: String, required: true },
  point: {type: String, require: false},
  team: String,
  rank: String,
  // avatar: String
});


const Driver = model<Schedule>('Schedule', scheduleSchema);
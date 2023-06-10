import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Team {
  rank: string;
  point: string;
  name: string;
  driver: [];
  // avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const teamSchema = new Schema<Team>({
  name: { type: String, required: true },
  point: {type: String, require: false},
  driver: [],
  rank: String,
  // avatar: String
});


export const Team = model<Team>('Driver', teamSchema);
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface teamType {
  id?: number;
  points: Number;
  pos: String;
  name: string;
  year?: number;
}

// 2. Create a Schema corresponding to the document interface.
const teamSchema = new Schema<teamType>({
  id: Number,
  name: { type: String, required: false },
  points: {type: Number, require: false},
  pos: String,
  year: Number
  // avatar: String
});


export const Team = model<teamType>('Team', teamSchema);
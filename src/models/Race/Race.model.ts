import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface raceType {
    id?: number;
    grand: String;
    date: String;
    winner: String;
    car: String;
    laps: String;
    time:String
    year?: number;
}

// 2. Create a Schema corresponding to the document interface.
const raceSchema = new Schema<raceType>({
    grand: String,
    year: Number,
    date: String,
    winner: String,
    car: String,
    laps: String,
    time: String
});


export const Race = model<raceType>('Race', raceSchema);
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface raceDetailType {
    id?: number;
    no: number;
    driver: string;
    car: String;
    pos: String;
    laps: String;
    time: string;
    points: number;
    year?: number;
    map?: String;

}

// 2. Create a Schema corresponding to the document interface.
const raceDetailSchema = new Schema<raceDetailType>({
    id: Number,
    no: Number,
    driver: String,
    car: String,
    laps: String,
    pos: String,
    time: String,
    points: Number,
    year: Number,
    map: String,
});

export const RaceDetail = model<raceDetailType>('RaceDetail', raceDetailSchema);
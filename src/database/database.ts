import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
   const connect =  await mongoose.connect("mongodb://127.0.0.1:27017/vrillar");
  //  console.log(connect.)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
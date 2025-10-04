import 'reflect-metadata';
import { Service } from 'typedi';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

@Service()
export class MongoService {
  private isConnected = false;
 constructor() {
    console.log('MongoService instance initialized');
  }
  public async connect() {
    if (this.isConnected) {
      console.log('Using existing MongoDB connection');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI || '', {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });

    this.isConnected = true;
    console.log('MongoDB connected via typedi Singleton');
  }
}

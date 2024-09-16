import mongoose from 'mongoose';
import { connectRabbitMQ } from './rabbitmq';
import { consumeWalletMessages } from '../rabbitmq/consumer';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


export const connectRMQ = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI!);
    // RabbitMQ Connection
    await connectRabbitMQ();
    await consumeWalletMessages();


    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
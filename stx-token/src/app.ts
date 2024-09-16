import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import errorHandler from './middleware/error.middleware';
import { connectDB } from './utils/logger';

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

export default app;

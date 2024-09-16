import app from './app';
import { connectDB, connectRMQ } from './utils/logger';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  // MongoDB Connection
  await connectDB();

  // RabbitMQ Connection
  await connectRMQ()

  console.log(`Server is running on port ${PORT}`);
});

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/authRoutes';
import { goalRouter } from './routes/goalRoutes';
import { workoutRouter } from './routes/workoutRoutes';
import { CustomError } from './utils/helpers';

config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/goals', goalRouter);
app.use('/api/workouts', workoutRouter);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err);
  res.status(status).json({ success: false, error: message });
});

mongoose.connect(process.env.DATABASE_URL!)
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });

```
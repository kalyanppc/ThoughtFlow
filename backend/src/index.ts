// app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user'; // Assuming you have a user router
import blogRouter from './routes/blog'; // Assuming you have a blog router

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blog', blogRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to your Express application!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

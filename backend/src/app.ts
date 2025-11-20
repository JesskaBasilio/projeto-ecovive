//IMPORTS
import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

// MIDDLEWARES
const app = express();
app.use(express.json());


// ROUTES
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// PRIVATE ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vindo à nossa API!' });
});

export default app;

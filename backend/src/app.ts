//IMPORTS
import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from "./routes/productRoutes";
//import cors from 'cors'; (deve instalar ver depois)

// MIDDLEWARES
const app = express();
app.use(express.json());
//app.use(cors())


// ROUTES
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use("/products", productRoutes);

// PRIVATE ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vindo à nossa API!' });
});

export default app;

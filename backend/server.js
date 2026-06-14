import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import UserRoutes from './src/routes/userRoutes.js';
import AuthRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';


dotenv.config();

const app = express();

// middleware
app.use(express.json());



// DB connect
connectDB();

//Routes
app.use("/api/users",UserRoutes);
app.use("/api/auth",AuthRoutes);
app.use("/api/products",productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
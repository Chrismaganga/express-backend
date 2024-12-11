import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import productRoute from './routes/product';
import homeRoute from './routes/home';
import cartRoute from './routes/cart';
import userRoute from './routes/user';
import authRoute from './routes/auth';

// Initialize dotenv
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Create Express app
const app = express();

// Port
const port = process.env.PORT || 6400;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.disable('view cache');

// Routes
app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

// Mongoose settings
mongoose.set('strictQuery', false);
// mongoose.set('useUnifiedTopology', true); // This option is not valid for mongoose.set

// Connect to MongoDB and start server
mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch((err: Error) => {
        console.error(err);
    });

export default app;
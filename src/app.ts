import dotenv from 'dotenv';
import express from 'express';
var cors = require('cors');

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

import accountRoutes from './components/account/accountRoutes';
import holderRoutes from './components/holder/holderRoutes';
import unitRoutes from './components/unit/unitRoutes';
import residenceRoutes from './components/residence/residenceRoutes';
//import clientRoutes from './components/client/clientRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/account', accountRoutes);
app.use('/holder', holderRoutes);
app.use('/unit', unitRoutes);
app.use('/residence', residenceRoutes);
//app.use('/client', () => console.log('client'));

export default app;

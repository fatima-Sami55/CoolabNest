import express from 'express';
import dbConnect from './src/config/db.js'; 
import dotenv from 'dotenv';
import signupRoute from './src/Routes/authentication/signup.js';
import loginRoute from './src/Routes/authentication/login.js';
import logoutRoute from './src/Routes/authentication/logout.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(express.json());


app.get('/home', (req, res) => {
  res.send('Welcome to CollabNest Backend');
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


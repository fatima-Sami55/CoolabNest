import express from 'express';
import dbConnect from './src/config/db.js'; 
import dotenv from 'dotenv';
import signupRoute from './src/Routes/authentication/signup.js';
import loginRoute from './src/Routes/authentication/login.js';
import logoutRoute from './src/Routes/authentication/logout.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:5174', // Backup port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

dbConnect();

app.use(express.json());


app.get('/home', (req, res) => {
  res.send('Welcome to CollabNest Backend');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

app.get('/test-email', async (req, res) => {
  try {
    const sendVerificationEmail = (await import('./src/helpers/sendVerificationEmail.js')).default;
    
    console.log('Testing email functionality...');
    const testResult = await sendVerificationEmail(
      'zaidsaigal2005@gmail.com', 
      'TestUser', 
      'test-token-123', 
      'test-user-id-456'
    );
    
    res.json({ 
      message: 'Email test completed', 
      success: testResult,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({ 
      message: 'Email test failed', 
      error: error.message 
    });
  }
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


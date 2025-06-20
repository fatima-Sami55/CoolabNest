import express from 'express';
import dbConnect from './src/config/db.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


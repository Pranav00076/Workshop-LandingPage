import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workshop';

app.use(cors());
app.use(express.json());

// Serverless MongoDB Connection Wrapper
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Throw so we can catch it in the route
  }
};

// Enquiry Schema & Model
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// Enquiry API Endpoint
app.post('/api/enquiry', async (req: Request, res: Response) => {
  try {
    await connectDB(); // Ensure DB is connected before processing
    
    const { name, email, phone } = req.body;

    // Server-side validation
    if (!name || !email || !phone) {
      res.status(400).json({ error: 'All fields (name, email, phone) are required.' });
      return;
    }

    // Email basic validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email address format.' });
      return;
    }

    // Phone basic validation (at least 10 digits)
    if (phone.replace(/\D/g, '').length < 10) {
      res.status(400).json({ error: 'Phone number must have at least 10 digits.' });
      return;
    }

    const newEnquiry = new Enquiry({ name, email, phone });
    await newEnquiry.save();

    res.status(201).json({ message: 'Registration successful', data: newEnquiry });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
});

// Vercel Serverless Function compatibility
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

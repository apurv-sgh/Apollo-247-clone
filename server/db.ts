import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// Prevent deprecation warnings
mongoose.set('strictQuery', false);

// MongoDB connection
const connectDB = async () => {
  try {
    // Use the MONGODB_URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables.');
    }

    // Connect with improved options
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
      socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
      connectTimeoutMS: 30000,
      retryWrites: true,
      retryReads: true,
    });
    
    console.log('MongoDB Connected Successfully!');
    
    // Get connection information
    const db = mongoose.connection;
    
    // Set up event listeners to handle connection events
    db.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
    
    db.on('disconnected', () => {
      console.log('MongoDB disconnected, trying to reconnect...');
    });
    
    db.on('reconnected', () => {
      console.log('MongoDB reconnected!');
    });
    
    return db;
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    // Don't exit process, handle error gracefully
    console.error('Please check your MongoDB connection string and network connectivity.');
    return null;
  }
};

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  consultationFee: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  image: {
    type: String,
    required: true
  },
  availability: {
    online: {
      type: Boolean,
      default: false
    },
    inClinic: {
      type: Boolean,
      default: false
    },
    homeVisit: {
      type: Boolean,
      default: false
    }
  },
  availableDays: {
    type: [String],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Create indexes for better query performance
doctorSchema.index({ specialty: 1 });
doctorSchema.index({ gender: 1 });
doctorSchema.index({ experience: 1 });
doctorSchema.index({ consultationFee: 1 });
doctorSchema.index({ 'availability.online': 1 });
doctorSchema.index({ 'availability.inClinic': 1 });
doctorSchema.index({ 'availability.homeVisit': 1 });

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default connectDB;

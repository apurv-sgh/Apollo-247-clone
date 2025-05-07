// Script to seed the database with sample doctors data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Define Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  qualification: String,
  experience: Number,
  languages: [String],
  hospital: String,
  location: String,
  consultationFee: Number,
  rating: Number,
  ratingCount: Number,
  gender: String,
  image: String,
  availability: {
    online: Boolean,
    inClinic: Boolean,
    homeVisit: Boolean
  },
  availableDays: [String],
  isActive: Boolean
}, { timestamps: true });

// Create Doctor model
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

// Sample doctors data
const doctorsData =  [
  {
    _id: "60d5ec9af682fbd12a0695c7",
    name: "Dr. Rahul Sharma",
    specialty: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: 12,
    languages: ["English", "Hindi"],
    hospital: "Apollo Hospitals",
    location: "Delhi",
    consultationFee: 800,
    rating: 4.8,
    ratingCount: 245,
    gender: "male",
    image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["today", "tomorrow", "weekend"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695c8",
    name: "Dr. Priya Patel",
    specialty: "Internal Medicine",
    qualification: "MBBS, DNB (Internal Medicine)",
    experience: 8,
    languages: ["English", "Hindi", "Gujarati"],
    hospital: "Apollo Clinic",
    location: "Mumbai",
    consultationFee: 700,
    rating: 4.6,
    ratingCount: 187,
    gender: "female",
    image: "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-coat_23-2148698867.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["today", "tomorrow"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695c9",
    name: "Dr. Anand Kumar",
    specialty: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: 15,
    languages: ["English", "Hindi", "Tamil"],
    hospital: "Apollo Hospitals",
    location: "Chennai",
    consultationFee: 900,
    rating: 4.9,
    ratingCount: 320,
    gender: "male",
    image: "https://mysmartdoctor.in/image/314c8b7c9f591c2ac8d1127dc9bac3541721804706.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: true
    },
    availableDays: ["today", "weekend"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695ca",
    name: "Dr. Sunita Reddy",
    specialty: "Internal Medicine",
    qualification: "MBBS, MD, DM (Infectious Diseases)",
    experience: 10,
    languages: ["English", "Telugu", "Hindi"],
    hospital: "Apollo Spectra",
    location: "Hyderabad",
    consultationFee: 1200,
    rating: 4.7,
    ratingCount: 156,
    gender: "female",
    image: "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-coat_23-2148698867.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["tomorrow", "weekend"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695cb",
    name: "Dr. Vikram Singh",
    specialty: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: 7,
    languages: ["English", "Hindi", "Punjabi"],
    hospital: "Apollo Clinic",
    location: "Chandigarh",
    consultationFee: 600,
    rating: 4.5,
    ratingCount: 98,
    gender: "male",
    image: "https://mysmartdoctor.in/image/314c8b7c9f591c2ac8d1127dc9bac3541721804706.jpg",
    availability: {
      online: true,
      inClinic: false,
      homeVisit: false
    },
    availableDays: ["today", "tomorrow"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695cc",
    name: "Dr. Meera Iyer",
    specialty: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 9,
    languages: ["English", "Malayalam", "Hindi"],
    hospital: "Apollo Hospitals",
    location: "Bangalore",
    consultationFee: 750,
    rating: 4.7,
    ratingCount: 134,
    gender: "female",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zAPTgZh14-u9GUDYGcPocxnKXY0kkZZ0Ig&s",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["today", "weekend"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695cd",
    name: "Dr. Rajiv Mehta",
    specialty: "General Physician",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 11,
    languages: ["English", "Hindi", "Marathi"],
    hospital: "Apollo Clinic",
    location: "Pune",
    consultationFee: 650,
    rating: 4.6,
    ratingCount: 178,
    gender: "male",
    image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: true
    },
    availableDays: ["tomorrow", "weekend"],
    isActive: true
  },
  {
    _id: "60d5ec9af682fbd12a0695ce",
    name: "Dr. Anjali Desai",
    specialty: "Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 6,
    languages: ["English", "Gujarati", "Hindi"],
    hospital: "Apollo Spectra",
    location: "Ahmedabad",
    consultationFee: 550,
    rating: 4.4,
    ratingCount: 87,
    gender: "female",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zAPTgZh14-u9GUDYGcPocxnKXY0kkZZ0Ig&s",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["today", "tomorrow"],
    isActive: true
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Clear existing doctor data
    await Doctor.deleteMany({});
    console.log('Cleared existing doctor data');
    
    // Insert new doctor data
    await Doctor.insertMany(doctorsData);
    console.log(`Inserted ${doctorsData.length} doctors`);
    
    console.log('Database seeded successfully!');
    // Use setTimeout to allow the console.log to complete before exiting
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  } catch (error) {
    console.error('Error seeding database:', error);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
}

// Run the seeding function
seedDatabase();
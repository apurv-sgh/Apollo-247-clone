import { Doctor } from './db';
import { DoctorFilter, InsertDoctor, Doctor as DoctorType } from "@shared/schema";
import mongoose from 'mongoose';
import { log } from './vite';

// Sample doctor data for development
const sampleDoctors = [
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
    image: "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-coat_23-2148698867.jpg",
    availability: {
      online: true,
      inClinic: true,
      homeVisit: false
    },
    availableDays: ["today", "tomorrow"],
    isActive: true
  }
];

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Doctor methods
  createDoctor(doctor: InsertDoctor): Promise<any>;
  getDoctors(filter: DoctorFilter): Promise<{doctors: any[], total: number}>;
  getDoctorById(id: string): Promise<any | null>;
}

export class MongoStorage implements IStorage {
  private useSampleData: boolean = false;

  constructor() {
    // Check MongoDB connection status and set useSampleData accordingly
    this.checkMongoConnection();
  }

  private async checkMongoConnection(): Promise<void> {
    try {
      // Check MongoDB connection status
      const isConnected = mongoose.connection.readyState === 1;
      if (!isConnected) {
        log('MongoDB is not connected. Using sample data for development.', 'express');
        this.useSampleData = true;
      }
    } catch (error) {
      log('Error checking MongoDB connection. Using sample data.', 'express');
      this.useSampleData = true;
    }
  }

  // Kept for compatibility with original code
  async getUser(id: number): Promise<any | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return undefined;
  }

  async createUser(user: any): Promise<any> {
    return user;
  }

  // Doctor methods
  async createDoctor(doctor: InsertDoctor): Promise<any> {
    try {
      await this.checkMongoConnection();
      
      if (this.useSampleData) {
        // Generate a mock ID and return the doctor data for development
        const mockId = Math.random().toString(36).substring(2, 15);
        return {
          _id: mockId,
          ...doctor,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
      
      // Real MongoDB implementation
      const newDoctor = new Doctor(doctor);
      await newDoctor.save();
      return newDoctor;
    } catch (error) {
      log(`Error creating doctor: ${error}`, 'express');
      // Generate a mock ID and return the doctor data as fallback
      const mockId = Math.random().toString(36).substring(2, 15);
      return {
        _id: mockId,
        ...doctor,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }

  async getDoctorById(id: string): Promise<any | null> {
    try {
      await this.checkMongoConnection();
      
      if (this.useSampleData) {
        // Use sample data for development
        return sampleDoctors.find(doctor => doctor._id === id) || null;
      }
      
      // Real MongoDB implementation
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await Doctor.findById(id);
    } catch (error) {
      log(`Error getting doctor by ID: ${error}`, 'express');
      // Use sample data as fallback
      return sampleDoctors.find(doctor => doctor._id === id) || null;
    }
  }

  async getDoctors(filter: DoctorFilter): Promise<{doctors: any[], total: number}> {
    try {
      await this.checkMongoConnection();
      
      // Use sample data if MongoDB is not connected
      if (this.useSampleData) {
        return this.getSampleDoctors(filter);
      }
      
      // Real MongoDB implementation
      const { 
        consultationType, 
        availability, 
        gender, 
        experience, 
        feesRange,
        hospital,
        page = 1, 
        limit = 10,
        sortBy = 'relevance'
      } = filter;

      const query: any = { isActive: true };
      
      // Apply filters
      if (consultationType && consultationType.length > 0) {
        const consultationQuery: any = { $or: [] };
        
        if (consultationType.includes('online')) {
          consultationQuery.$or.push({ 'availability.online': true });
        }
        
        if (consultationType.includes('in-clinic')) {
          consultationQuery.$or.push({ 'availability.inClinic': true });
        }
        
        if (consultationType.includes('home-visit')) {
          consultationQuery.$or.push({ 'availability.homeVisit': true });
        }
        
        if (consultationQuery.$or.length > 0) {
          query.$and = query.$and || [];
          query.$and.push(consultationQuery);
        }
      }
      
      if (availability && availability.length > 0) {
        query.availableDays = { $in: availability };
      }
      
      if (gender && gender.length > 0) {
        query.gender = { $in: gender };
      }
      
      if (experience && experience.length > 0) {
        const experienceQuery: any = { $or: [] };
        
        if (experience.includes('0-5')) {
          experienceQuery.$or.push({ experience: { $gte: 0, $lte: 5 } });
        }
        
        if (experience.includes('5-10')) {
          experienceQuery.$or.push({ experience: { $gt: 5, $lte: 10 } });
        }
        
        if (experience.includes('10+')) {
          experienceQuery.$or.push({ experience: { $gt: 10 } });
        }
        
        if (experienceQuery.$or.length > 0) {
          query.$and = query.$and || [];
          query.$and.push(experienceQuery);
        }
      }
      
      if (feesRange && feesRange.length > 0) {
        const feesQuery: any = { $or: [] };
        
        if (feesRange.includes('0-500')) {
          feesQuery.$or.push({ consultationFee: { $gte: 0, $lte: 500 } });
        }
        
        if (feesRange.includes('500-1000')) {
          feesQuery.$or.push({ consultationFee: { $gt: 500, $lte: 1000 } });
        }
        
        if (feesRange.includes('1000+')) {
          feesQuery.$or.push({ consultationFee: { $gt: 1000 } });
        }
        
        if (feesQuery.$or.length > 0) {
          query.$and = query.$and || [];
          query.$and.push(feesQuery);
        }
      }
      
      if (hospital && hospital.length > 0) {
        query.hospital = { $in: hospital };
      }

      // Apply sorting
      let sort: any = { name: 1 }; // default sort by name
      
      switch (sortBy) {
        case 'experience':
          sort = { experience: -1 };
          break;
        case 'fees-low-to-high':
          sort = { consultationFee: 1 };
          break;
        case 'fees-high-to-low':
          sort = { consultationFee: -1 };
          break;
        case 'availability':
          // For availability, we might sort by number of available days
          // This is a simplified approach
          sort = { availableDays: -1 };
          break;
        case 'relevance':
        default:
          // For relevance, we might want to sort by rating and experience
          sort = { rating: -1, experience: -1 };
          break;
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      try {
        // Get total count
        const total = await Doctor.countDocuments(query);
        
        // Get doctors with pagination
        const doctors = await Doctor.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit);
        
        return {
          doctors,
          total
        };
      } catch (mongoError) {
        log(`MongoDB query error: ${mongoError}. Using sample data as fallback.`, 'express');
        return this.getSampleDoctors(filter);
      }
    } catch (error) {
      log(`Error in getDoctors: ${error}. Using sample data.`, 'express');
      return this.getSampleDoctors(filter);
    }
  }

  // Helper method to get filtered sample doctors
  private getSampleDoctors(filter: DoctorFilter): {doctors: any[], total: number} {
    const { 
      consultationType, 
      availability, 
      gender, 
      experience, 
      feesRange,
      hospital,
      page = 1, 
      limit = 10,
      sortBy = 'relevance'
    } = filter;

    // Start with all sample doctors
    let filteredDoctors = [...sampleDoctors];
    
    // Apply consultation type filter
    if (consultationType && consultationType.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        if (consultationType.includes('online') && doctor.availability.online) return true;
        if (consultationType.includes('in-clinic') && doctor.availability.inClinic) return true;
        if (consultationType.includes('home-visit') && doctor.availability.homeVisit) return true;
        return false;
      });
    }
    
    // Apply availability filter
    if (availability && availability.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        return doctor.availableDays.some(day => availability.includes(day));
      });
    }
    
    // Apply gender filter
    if (gender && gender.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => gender.includes(doctor.gender));
    }
    
    // Apply experience filter
    if (experience && experience.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        if (experience.includes('0-5') && doctor.experience >= 0 && doctor.experience <= 5) return true;
        if (experience.includes('5-10') && doctor.experience > 5 && doctor.experience <= 10) return true;
        if (experience.includes('10+') && doctor.experience > 10) return true;
        return false;
      });
    }
    
    // Apply fees range filter
    if (feesRange && feesRange.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        if (feesRange.includes('0-500') && doctor.consultationFee >= 0 && doctor.consultationFee <= 500) return true;
        if (feesRange.includes('500-1000') && doctor.consultationFee > 500 && doctor.consultationFee <= 1000) return true;
        if (feesRange.includes('1000+') && doctor.consultationFee > 1000) return true;
        return false;
      });
    }
    
    // Apply hospital filter
    if (hospital && hospital.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => hospital.includes(doctor.hospital));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'experience':
        filteredDoctors.sort((a, b) => b.experience - a.experience);
        break;
      case 'fees-low-to-high':
        filteredDoctors.sort((a, b) => a.consultationFee - b.consultationFee);
        break;
      case 'fees-high-to-low':
        filteredDoctors.sort((a, b) => b.consultationFee - a.consultationFee);
        break;
      case 'availability':
        filteredDoctors.sort((a, b) => b.availableDays.length - a.availableDays.length);
        break;
      case 'relevance':
      default:
        filteredDoctors.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.experience - a.experience;
        });
        break;
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
    
    return {
      doctors: paginatedDoctors,
      total: filteredDoctors.length
    };
  }
}

// Use MongoDB storage
export const storage = new MongoStorage;

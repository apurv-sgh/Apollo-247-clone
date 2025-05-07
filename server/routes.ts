import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import connectDB from "./db";
import { doctorFilterSchema, insertDoctorSchema } from "@shared/schema";
import { ZodError } from "zod";
import mongoose from "mongoose";

// Initialize database connection
let dbInitialized = false;

const initDB = async () => {
  try {
    // Connect to MongoDB
    const db = await connectDB();
    if (db) {
      console.log('Database initialized successfully.');
      dbInitialized = true;
    } else {
      console.warn('Unable to initialize database. Some features may not work properly.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Try to connect to MongoDB
initDB();

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Add doctor endpoint
  app.post("/api/doctors", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const doctorData = insertDoctorSchema.parse(req.body);
      
      // Create doctor
      const doctor = await storage.createDoctor(doctorData);
      
      return res.status(201).json({
        message: "Doctor added successfully",
        data: doctor
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors
        });
      }
      
      console.error("Error adding doctor:", error);
      return res.status(500).json({
        message: "Failed to add doctor"
      });
    }
  });
  
  // Get doctor by ID
  app.get("/api/doctors/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const doctor = await storage.getDoctorById(id);
      
      if (!doctor) {
        return res.status(404).json({
          message: "Doctor not found"
        });
      }
      
      return res.json(doctor);
    } catch (error) {
      console.error("Error getting doctor:", error);
      return res.status(500).json({
        message: "Failed to get doctor"
      });
    }
  });
  
  // List doctors with filters
  app.get("/api/doctors", async (req: Request, res: Response) => {
    try {
      // Parse and validate query parameters
      const {
        consultationType,
        availability,
        gender,
        experience,
        feesRange,
        hospital,
        page,
        limit,
        sortBy
      } = req.query;
      
      // Transform query parameters to expected types
      const filter = doctorFilterSchema.parse({
        consultationType: consultationType ? (Array.isArray(consultationType) ? consultationType : [consultationType]) : undefined,
        availability: availability ? (Array.isArray(availability) ? availability : [availability]) : undefined,
        gender: gender ? (Array.isArray(gender) ? gender : [gender]) : undefined,
        experience: experience ? (Array.isArray(experience) ? experience : [experience]) : undefined,
        feesRange: feesRange ? (Array.isArray(feesRange) ? feesRange : [feesRange]) : undefined,
        hospital: hospital ? (Array.isArray(hospital) ? hospital : [hospital]) : undefined,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
        sortBy: sortBy || 'relevance'
      });
      
      // Get doctors with the applied filters
      const { doctors, total } = await storage.getDoctors(filter);
      
      return res.json({
        data: doctors,
        meta: {
          total,
          page: filter.page,
          limit: filter.limit,
          totalPages: Math.ceil(total / filter.limit)
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid filter parameters",
          errors: error.errors
        });
      }
      
      console.error("Error listing doctors:", error);
      return res.status(500).json({
        message: "Failed to list doctors"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}



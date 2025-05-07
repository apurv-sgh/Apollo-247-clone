import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema (kept for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Doctor schema
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  qualification: text("qualification").notNull(),
  experience: integer("experience").notNull(), // in years
  languages: text("languages").array().notNull(),
  hospital: text("hospital").notNull(),
  location: text("location").notNull(),
  consultationFee: integer("consultation_fee").notNull(),
  rating: integer("rating").default(0),
  ratingCount: integer("rating_count").default(0),
  gender: text("gender").notNull(),
  image: text("image").notNull(),
  availability: jsonb("availability").notNull(), // { online: boolean, inClinic: boolean, homeVisit: boolean }
  availableDays: text("available_days").array().notNull(), // ['today', 'tomorrow', 'weekend', etc.]
  isActive: boolean("is_active").default(true),
});

export const insertDoctorSchema = createInsertSchema(doctors).omit({
  id: true,
  rating: true,
  ratingCount: true,
  isActive: true,
});

// Extended schema for frontend form validation
export const doctorValidationSchema = insertDoctorSchema.extend({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  specialty: z.string().min(2, { message: "Specialty is required" }),
  qualification: z.string().min(2, { message: "Qualification is required" }),
  experience: z.number().min(0, { message: "Experience must be a positive number" }),
  languages: z.array(z.string()).min(1, { message: "At least one language is required" }),
  hospital: z.string().min(2, { message: "Hospital name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  consultationFee: z.number().min(0, { message: "Consultation fee must be a positive number" }),
  gender: z.enum(["male", "female"], { message: "Gender must be either 'male' or 'female'" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  availability: z.object({
    online: z.boolean(),
    inClinic: z.boolean(),
    homeVisit: z.boolean(),
  }),
  availableDays: z.array(z.string()).min(1, { message: "At least one available day is required" }),
});

// Filter schema
export const doctorFilterSchema = z.object({
  consultationType: z.array(z.enum(["online", "in-clinic", "home-visit"])).optional(),
  availability: z.array(z.enum(["today", "tomorrow", "weekend"])).optional(),
  gender: z.array(z.enum(["male", "female"])).optional(),
  experience: z.array(z.enum(["0-5", "5-10", "10+"])).optional(),
  feesRange: z.array(z.enum(["0-500", "500-1000", "1000+"])).optional(),
  hospital: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(["relevance", "experience", "fees-low-to-high", "fees-high-to-low", "availability"]).default("relevance"),
});

export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = typeof doctors.$inferSelect;
export type DoctorFilter = z.infer<typeof doctorFilterSchema>;

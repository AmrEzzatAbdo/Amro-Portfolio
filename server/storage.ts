import { 
  users, 
  profiles, 
  experiences, 
  skills, 
  educations, 
  certificates, 
  contactMessages,
  type User, 
  type InsertUser,
  type Profile,
  type InsertProfile,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill,
  type Education,
  type InsertEducation,
  type Certificate,
  type InsertCertificate,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, and, asc, desc, SQL } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile methods
  getProfile(id: number): Promise<Profile | undefined>;
  getProfileByUserId(userId: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Experience methods
  getExperiences(profileId: number): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Skill methods
  getSkills(profileId: number): Promise<Skill[]>;
  getSkillsByCategory(profileId: number, category: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Education methods
  getEducations(profileId: number): Promise<Education[]>;
  getEducation(id: number): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;
  
  // Certificate methods
  getCertificates(profileId: number): Promise<Certificate[]>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate | undefined>;
  deleteCertificate(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessages(userId?: number): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage, userId?: number): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Profile methods
  async getProfile(id: number): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getProfileByUserId(userId: number): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createProfile(profile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profiles).values(profile).returning();
    return result[0];
  }
  
  async updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    const result = await db.update(profiles)
      .set({
        ...profile,
        updatedAt: new Date()
      })
      .where(eq(profiles.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Experience methods
  async getExperiences(profileId: number): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(eq(experiences.profileId, profileId))
      .orderBy(asc(experiences.order));
  }
  
  async getExperience(id: number): Promise<Experience | undefined> {
    const result = await db.select().from(experiences).where(eq(experiences.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const result = await db.insert(experiences).values(experience).returning();
    return result[0];
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const result = await db.update(experiences)
      .set({
        ...experience,
        updatedAt: new Date()
      })
      .where(eq(experiences.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    await db.delete(experiences).where(eq(experiences.id, id));
    return true;
  }
  
  // Skill methods
  async getSkills(profileId: number): Promise<Skill[]> {
    return await db.select().from(skills)
      .where(eq(skills.profileId, profileId))
      .orderBy(asc(skills.order));
  }
  
  async getSkillsByCategory(profileId: number, category: string): Promise<Skill[]> {
    return await db.select().from(skills)
      .where(and(
        eq(skills.profileId, profileId),
        eq(skills.category, category)
      ))
      .orderBy(asc(skills.order));
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const result = await db.update(skills)
      .set({
        ...skill,
        updatedAt: new Date()
      })
      .where(eq(skills.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  
  // Education methods
  async getEducations(profileId: number): Promise<Education[]> {
    return await db.select().from(educations)
      .where(eq(educations.profileId, profileId))
      .orderBy(asc(educations.order));
  }
  
  async getEducation(id: number): Promise<Education | undefined> {
    const result = await db.select().from(educations).where(eq(educations.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createEducation(education: InsertEducation): Promise<Education> {
    const result = await db.insert(educations).values(education).returning();
    return result[0];
  }
  
  async updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined> {
    const result = await db.update(educations)
      .set({
        ...education,
        updatedAt: new Date()
      })
      .where(eq(educations.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteEducation(id: number): Promise<boolean> {
    await db.delete(educations).where(eq(educations.id, id));
    return true;
  }
  
  // Certificate methods
  async getCertificates(profileId: number): Promise<Certificate[]> {
    return await db.select().from(certificates)
      .where(eq(certificates.profileId, profileId))
      .orderBy(asc(certificates.order));
  }
  
  async getCertificate(id: number): Promise<Certificate | undefined> {
    const result = await db.select().from(certificates).where(eq(certificates.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const result = await db.insert(certificates).values(certificate).returning();
    return result[0];
  }
  
  async updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate | undefined> {
    const result = await db.update(certificates)
      .set({
        ...certificate,
        updatedAt: new Date()
      })
      .where(eq(certificates.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteCertificate(id: number): Promise<boolean> {
    await db.delete(certificates).where(eq(certificates.id, id));
    return true;
  }
  
  // Contact message methods
  async getContactMessages(userId?: number): Promise<ContactMessage[]> {
    if (userId) {
      return await db.select().from(contactMessages)
        .where(eq(contactMessages.userId, userId))
        .orderBy(desc(contactMessages.createdAt));
    }
    return await db.select().from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createContactMessage(message: InsertContactMessage, userId?: number): Promise<ContactMessage> {
    const result = await db.insert(contactMessages)
      .values({
        ...message,
        userId: userId || null
      })
      .returning();
    return result[0];
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const result = await db.update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();

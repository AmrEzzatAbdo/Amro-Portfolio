import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

// Middleware for handling Zod validation errors
const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }
      return res.status(500).json({
        message: "An unexpected error occurred during validation",
      });
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submission
  app.post(
    "/api/contact", 
    validateRequest(insertContactMessageSchema), 
    async (req, res) => {
      try {
        const contactData = req.body;
        
        // Save the contact message to the database
        const savedMessage = await storage.createContactMessage(contactData);
        
        return res.status(201).json({ 
          message: "Message sent successfully",
          id: savedMessage.id
        });
      } catch (error) {
        console.error("Error processing contact form:", error);
        return res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  );

  // API route to get all contact messages (for admin)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        message: "An error occurred while fetching contact messages"
      });
    }
  });
  
  // API route to mark a contact message as read
  app.patch("/api/contact/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const updatedMessage = await storage.markContactMessageAsRead(id);
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      return res.status(200).json(updatedMessage);
    } catch (error) {
      console.error("Error marking message as read:", error);
      return res.status(500).json({
        message: "An error occurred while updating the message"
      });
    }
  });
  
  // API route to delete a contact message
  app.delete("/api/contact/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const exists = await storage.getContactMessage(id);
      if (!exists) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      await storage.deleteContactMessage(id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting message:", error);
      return res.status(500).json({
        message: "An error occurred while deleting the message"
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}

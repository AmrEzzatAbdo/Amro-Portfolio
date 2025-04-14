// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  location: text("location"),
  phone: text("phone"),
  birthDate: text("birth_date"),
  achievement: text("achievement"),
  industryExperience: jsonb("industry_experience").default([]),
  socialLinks: jsonb("social_links").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull().references(() => profiles.id),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  location: text("location"),
  description: text("description"),
  achievements: jsonb("achievements").default([]),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull().references(() => profiles.id),
  name: text("name").notNull(),
  level: text("level").notNull(),
  percentage: integer("percentage").notNull(),
  category: text("category").notNull(),
  // 'technical', 'programming', 'language'
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull().references(() => profiles.id),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
  achievement: text("achievement"),
  courses: jsonb("courses").default([]),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull().references(() => profiles.id),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  }),
  contactMessages: many(contactMessages)
}));
var profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id]
  }),
  experiences: many(experiences),
  skills: many(skills),
  educations: many(educations),
  certificates: many(certificates)
}));
var experiencesRelations = relations(experiences, ({ one }) => ({
  profile: one(profiles, {
    fields: [experiences.profileId],
    references: [profiles.id]
  })
}));
var skillsRelations = relations(skills, ({ one }) => ({
  profile: one(profiles, {
    fields: [skills.profileId],
    references: [profiles.id]
  })
}));
var educationsRelations = relations(educations, ({ one }) => ({
  profile: one(profiles, {
    fields: [educations.profileId],
    references: [profiles.id]
  })
}));
var certificatesRelations = relations(certificates, ({ one }) => ({
  profile: one(profiles, {
    fields: [certificates.profileId],
    references: [profiles.id]
  })
}));
var contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  user: one(users, {
    fields: [contactMessages.userId],
    references: [users.id]
  })
}));
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true
});
var insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertEducationSchema = createInsertSchema(educations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  userId: true,
  createdAt: true,
  read: true
});

// server/db.ts
import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig } from "@neondatabase/serverless";
neonConfig.fetchConnectionCache = true;
var sql = null;
var db = drizzle(sql);

// server/storage.ts
import { eq, and, asc, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : void 0;
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  // Profile methods
  async getProfile(id) {
    const result = await db.select().from(profiles).where(eq(profiles.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async getProfileByUserId(userId) {
    const result = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return result.length > 0 ? result[0] : void 0;
  }
  async createProfile(profile) {
    const result = await db.insert(profiles).values(profile).returning();
    return result[0];
  }
  async updateProfile(id, profile) {
    const result = await db.update(profiles).set({
      ...profile,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(profiles.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  // Experience methods
  async getExperiences(profileId) {
    return await db.select().from(experiences).where(eq(experiences.profileId, profileId)).orderBy(asc(experiences.order));
  }
  async getExperience(id) {
    const result = await db.select().from(experiences).where(eq(experiences.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async createExperience(experience) {
    const result = await db.insert(experiences).values(experience).returning();
    return result[0];
  }
  async updateExperience(id, experience) {
    const result = await db.update(experiences).set({
      ...experience,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(experiences.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  async deleteExperience(id) {
    await db.delete(experiences).where(eq(experiences.id, id));
    return true;
  }
  // Skill methods
  async getSkills(profileId) {
    return await db.select().from(skills).where(eq(skills.profileId, profileId)).orderBy(asc(skills.order));
  }
  async getSkillsByCategory(profileId, category) {
    return await db.select().from(skills).where(and(
      eq(skills.profileId, profileId),
      eq(skills.category, category)
    )).orderBy(asc(skills.order));
  }
  async getSkill(id) {
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async createSkill(skill) {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }
  async updateSkill(id, skill) {
    const result = await db.update(skills).set({
      ...skill,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(skills.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  async deleteSkill(id) {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  // Education methods
  async getEducations(profileId) {
    return await db.select().from(educations).where(eq(educations.profileId, profileId)).orderBy(asc(educations.order));
  }
  async getEducation(id) {
    const result = await db.select().from(educations).where(eq(educations.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async createEducation(education) {
    const result = await db.insert(educations).values(education).returning();
    return result[0];
  }
  async updateEducation(id, education) {
    const result = await db.update(educations).set({
      ...education,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(educations.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  async deleteEducation(id) {
    await db.delete(educations).where(eq(educations.id, id));
    return true;
  }
  // Certificate methods
  async getCertificates(profileId) {
    return await db.select().from(certificates).where(eq(certificates.profileId, profileId)).orderBy(asc(certificates.order));
  }
  async getCertificate(id) {
    const result = await db.select().from(certificates).where(eq(certificates.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async createCertificate(certificate) {
    const result = await db.insert(certificates).values(certificate).returning();
    return result[0];
  }
  async updateCertificate(id, certificate) {
    const result = await db.update(certificates).set({
      ...certificate,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(certificates.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  async deleteCertificate(id) {
    await db.delete(certificates).where(eq(certificates.id, id));
    return true;
  }
  // Contact message methods
  async getContactMessages(userId) {
    if (userId) {
      return await db.select().from(contactMessages).where(eq(contactMessages.userId, userId)).orderBy(desc(contactMessages.createdAt));
    }
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  async getContactMessage(id) {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return result.length > 0 ? result[0] : void 0;
  }
  async createContactMessage(message, userId) {
    const result = await db.insert(contactMessages).values({
      ...message,
      userId: userId || null
    }).returning();
    return result[0];
  }
  async markContactMessageAsRead(id) {
    const result = await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id)).returning();
    return result.length > 0 ? result[0] : void 0;
  }
  async deleteContactMessage(id) {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
var validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors
        });
      }
      return res.status(500).json({
        message: "An unexpected error occurred during validation"
      });
    }
  };
};
async function registerRoutes(app2) {
  app2.post(
    "/api/contact",
    validateRequest(insertContactMessageSchema),
    async (req, res) => {
      try {
        const contactData = req.body;
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
  app2.get("/api/contact", async (req, res) => {
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
  app2.patch("/api/contact/:id/read", async (req, res) => {
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
  app2.delete("/api/contact/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: false
  }, () => {
    log(`serving on port ${port}`);
  });
})();

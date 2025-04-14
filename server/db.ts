import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon, neonConfig } from '@neondatabase/serverless';

// Required for Neon serverless
neonConfig.fetchConnectionCache = true;

// Initialize the database connection
const sql = null;
export const db = drizzle(sql);
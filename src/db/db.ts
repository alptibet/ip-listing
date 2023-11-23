import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const queryClient = postgres(process.env.DB_URL!);
export const dbClient = drizzle(queryClient, { schema });

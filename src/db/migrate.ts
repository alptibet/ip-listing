import pg from 'pg';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});

const dbClient = drizzle(pool);

async function connect() {
  try {
    console.log('migration started...');
    await migrate(dbClient, { migrationsFolder: 'drizzle' });
    console.log('migration finished...');
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

connect();

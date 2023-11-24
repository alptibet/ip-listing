import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';

const migrationClient = postgres(process.env.DB_URL!, { max: 1 });

async function connect() {
  try {
    console.log('migration started...');
    await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });
    console.log('migration finished...');
    process.exit(0);
  } catch (error) {
    console.log('migration finished with errors');
    console.log(error);
    process.exit(0);
  }
}

connect();

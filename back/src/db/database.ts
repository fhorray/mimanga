import { createTables } from './models/mangas';

import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

(async () => {
  try {
    await pool.connect();

    console.log('Connected to the database');

    // Create Mangas Table
    await createTables();
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

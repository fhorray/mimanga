import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    const res = await client.query('SELECT NOW()');
    console.log('Database response: ', res.rows[0]);
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

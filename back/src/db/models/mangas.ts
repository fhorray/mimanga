import type { Manga } from 'types/mangaProps';
import pool from '@/db/database';

// CREATE TABLE
export const createMangasTable = async (): Promise<void> => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS mangas (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL
    )
    `);
  } catch (error) {
    console.error('Error creating table "Mangas": ', error);
  }
};

// GET MANGAS
export const getMangas = async (): Promise<Manga[] | undefined> => {
  try {
    const query = `
    SELECT * FROM mangas
  `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {}
};

// INSERT MANGA
export const insertManga = async (title: string, author: string) => {
  try {
    const query = `
      INSERT INTO mangas (title, author) VALUES ($1, $2) RETURNING *
    `;
    const values = [title, author];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log('Error inserting manga: ', error);
    throw error;
  }
};

// DELETE MANGA
export const deleteManga = async (id: string) => {
  try {
    const query = `DELETE FROM mangas WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.log('Error deleting manga: ', error);
    throw error;
  }
};

// UPDATE MANGA
export const updateManga = async (
  id: number,
  data: Partial<Manga>,
): Promise<void> => {
  try {
    // TODO: Estudar a fundo esse controler!

    const fieldsToUpdate = Object.keys(data)
      .filter((key) => data[key as keyof Manga] !== undefined) // it filters null and undefined fields
      .map((key) => `${key} = $${Object.keys(data).indexOf(key) + 1}`)
      .join(', '); // creates palceholders

    const values = Object.values(data).filter((value) => value !== undefined); // gets the values to be updated

    if (fieldsToUpdate.length === 0) {
      return;
    }

    const query = `
    UPDATE mangas 
    SET ${fieldsToUpdate}
    WHERE id = $${values.length + 1}
    `;

    await pool.query(query, [...values, id]);
  } catch (error) {
    console.log('Error updating manga: ', error);
    throw error;
  }
};

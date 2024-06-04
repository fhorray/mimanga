import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const mangasTable = pgTable('mangas', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: text('author'),
});

export type InsertManga = typeof mangasTable.$inferInsert;
export type SelectManga = typeof mangasTable.$inferSelect;

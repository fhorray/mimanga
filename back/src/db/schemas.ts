import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const mangasTable = pgTable('mangas', {
  id: uuid('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
});

export type InsertManga = typeof mangasTable.$inferInsert;
export type SelecttManga = typeof mangasTable.$inferSelect;

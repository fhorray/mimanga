import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  uuid,
  timestamp,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';

// ROLES ENUM
export const rolesEnum = pgEnum('roles', ['admin', 'user']);
export const genresEnum = pgEnum('genres', [
  'Adventure',
  'Fantasy',
  'Action',
  'Comedy',
  'Drama',
  'Sci-Fi',
  'Mystery',
  'Horror',
  'Thriller',
  'Romance',
  'Slice of Life',
  'Supernatural',
  'Martial Arts',
  'Mecha',
  'Psychological',
  'Sports',
  'Music',
  'Historical',
  'Military',
  'School',
  'Crime',
  'Western',
  'Tragedy',
  'Cyberpunk',
  'Steampunk',
  'Space Opera',
]);
export const demographicEnum = pgEnum('demographic', [
  'Shonen',
  'Shojo',
  'Seinen',
  'Josei',
  'Kodomo',
]);

// USERS TABLE
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  username: text('username'),
  email: text('email').notNull(),
  password: text('password').notNull(),
  role: rolesEnum('roles').default('user').notNull(),
  favoriteMangas: uuid('favoriteMangas'),
});

export const usersRelations = relations(users, ({ many }) => ({
  favoriteMangas: many(usersToMangas),
}));

// MANGAS TABLE
export const mangas = pgTable('mangas', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: text('author'),
  illustrator: text('illustrator'),
  cover: text('cover'),
  publisherId: uuid('publisher_id').notNull(),
  genres: genresEnum('genres'),
  demographic: demographicEnum('demographic'),
  originalRunId: uuid('original_run_id'),
});

export const mangasRelations = relations(mangas, ({ one, many }) => ({
  user: one(users, {
    fields: [mangas.id],
    references: [users.favoriteMangas],
  }),
  publishers: one(publishers, {
    fields: [mangas.publisherId],
    references: [publishers.id],
  }),
  originalRun: one(originalRun, {
    fields: [mangas.originalRunId],
    references: [originalRun.id],
  }),
  favoritedByUsers: many(usersToMangas),
}));

// USERS TO MANGAS TABLE
export const usersToMangas = pgTable(
  'users_to_mangas',
  {
    userId: uuid('user_id').notNull().references(()=> users.id), //prettier-ignore
    mangaId: uuid('manga_id').notNull().references(()=> mangas.id), //prettier-ignore
  },
  (t) => ({pk: primaryKey({ columns: [t.userId, t.mangaId] })})); //prettier-ignore

// STUDY: Study about the (t) above

export const usersToMangasRelations = relations(usersToMangas, ({ one }) => ({
  user: one(users, {
    fields: [usersToMangas.userId],
    references: [users.id],
  }),
  manga: one(mangas, {
    fields: [usersToMangas.mangaId],
    references: [mangas.id],
  }),
}));

// PUBLISHER TABLE
export const publishers = pgTable('publishers', {
  id: uuid('id').primaryKey().defaultRandom(),
  original: text('original'),
  english: text('english'),
});

export const publishersRelations = relations(publishers, ({ many }) => ({
  mangas: many(mangas),
}));

// ORIGINAL RUN TABLE
export const originalRun = pgTable('original_run', {
  id: uuid('id').primaryKey().defaultRandom(),
  start: timestamp('start').notNull(),
  end: timestamp('end'),
});

export const originalRunRelations = relations(originalRun, ({ many }) => ({
  mangas: many(mangas),
}));

// SESSION TABLE
export const sessions = pgTable('sessions', {
  sid: text('sid').primaryKey(),
  sess: text('sess').notNull(),
  expire: timestamp('expire', { precision: 6 }).notNull(),
});

export type InsertManga = typeof mangas.$inferInsert;
export type SelectManga = typeof mangas.$inferSelect;

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

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
export const demographicsEnum = pgEnum('demographic', [
  'Shonen',
  'Shojo',
  'Seinen',
  'Josei',
  'Kodomo',
]);
export const providersEnum = pgEnum('providers', [
  'discord',
  'local',
  'google',
]);

// TODO: Extend token to another table to include other informations
// USERS TABLE
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  username: text('username').unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: rolesEnum('roles').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  discordId: text('discord_id'),
  provider: providersEnum('providers').default('local'),
  token: text('token'),
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
  publisherId: uuid('publisher_id'),
  genres: genresEnum('genres'),
  demographic: demographicsEnum('demographic'),
  originalRunId: uuid('original_run_id'),
});

export const mangasRelations = relations(mangas, ({ one, many }) => ({
  favoritedByUsers: many(usersToMangas),
  publishers: one(publishers, {
    fields: [mangas.publisherId],
    references: [publishers.id],
  }),
  originalRun: one(originalRun, {
    fields: [mangas.originalRunId],
    references: [originalRun.id],
  }),
}));

// USERS TO MANGAS TABLE
export const usersToMangas = pgTable(
  'users_to_mangas',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    mangaId: uuid('manga_id')
      .notNull()
      .references(() => mangas.id),
  },
  (t) => ({ pk: primaryKey(t.userId, t.mangaId) }),
);

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
  start: timestamp('start'),
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

export type SelectPublisher = typeof users.$inferSelect;
export type InsertPublisher = typeof users.$inferInsert;

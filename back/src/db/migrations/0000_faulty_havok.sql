DO $$ BEGIN
 CREATE TYPE "public"."demographic" AS ENUM('Shonen', 'Shojo', 'Seinen', 'Josei', 'Kodomo');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."genres" AS ENUM('Adventure', 'Fantasy', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Mystery', 'Horror', 'Thriller', 'Romance', 'Slice of Life', 'Supernatural', 'Martial Arts', 'Mecha', 'Psychological', 'Sports', 'Music', 'Historical', 'Military', 'School', 'Crime', 'Western', 'Tragedy', 'Cyberpunk', 'Steampunk', 'Space Opera');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mangas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"author" text,
	"illustrator" text,
	"cover" text,
	"publisher_id" uuid NOT NULL,
	"genres" "genres",
	"demographic" "demographic",
	"original_run_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "original_run" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "publishers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"original" text,
	"english" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"sid" text PRIMARY KEY NOT NULL,
	"sess" text NOT NULL,
	"expire" timestamp (6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"roles" "roles" DEFAULT 'user' NOT NULL,
	"favoriteMangas" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_mangas" (
	"user_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "users_to_mangas_user_id_manga_id_pk" PRIMARY KEY("user_id","manga_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_mangas" ADD CONSTRAINT "users_to_mangas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_mangas" ADD CONSTRAINT "users_to_mangas_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."providers" AS ENUM('discord', 'local', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "discord_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "providers" "providers" DEFAULT 'local';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;
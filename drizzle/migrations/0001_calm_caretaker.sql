ALTER TABLE "users" ADD COLUMN "name" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "last_name";
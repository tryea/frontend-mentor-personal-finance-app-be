CREATE TABLE IF NOT EXISTS "user_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

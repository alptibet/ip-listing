DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('Assigned', 'Not Assigned');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(16),
	"location" varchar(16),
	"ip_address" varchar,
	"subnet" varchar,
	"gateway" varchar,
	"status" "status" DEFAULT 'Not Assigned',
	"system" varchar,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(16) NOT NULL,
	CONSTRAINT "projects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devices" ADD CONSTRAINT "devices_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

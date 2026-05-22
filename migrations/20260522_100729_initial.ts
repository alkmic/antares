import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'contributor');
  CREATE TYPE "public"."enum_articles_type" AS ENUM('decryptage', 'alerte', 'actualite', 'analyse', 'tribune');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'review', 'published', 'scheduled', 'archived');
  CREATE TYPE "public"."enum_bookings_location" AS ENUM('visio', 'paris', 'massy', 'nice');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show');
  CREATE TYPE "public"."enum_job_applications_status" AS ENUM('new', 'reviewing', 'interview', 'rejected', 'hired', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "avocats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"calendly_url" varchar,
  	"photo_id" integer,
  	"bio_short" varchar,
  	"bio_long" jsonb,
  	"is_partner" boolean DEFAULT false,
  	"is_published" boolean DEFAULT false,
  	"order_index" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "avocats_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"expertises_id" integer
  );
  
  CREATE TABLE "expertises" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"lede" varchar,
  	"body" jsonb,
  	"order_index" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"subtitle" varchar,
  	"type" "enum_articles_type",
  	"status" "enum_articles_status" DEFAULT 'draft',
  	"lede" varchar,
  	"body" jsonb,
  	"cover_image_id" integer,
  	"expertise_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"avocats_id" integer
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"client_email" varchar NOT NULL,
  	"scheduled_at" timestamp(3) with time zone,
  	"duration_minutes" numeric,
  	"avocat_id" integer,
  	"location" "enum_bookings_location",
  	"status" "enum_bookings_status" DEFAULT 'scheduled',
  	"calendly_event_uri" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"desired_role" varchar,
  	"target_expertise_id" integer,
  	"status" "enum_job_applications_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"avocats_id" integer,
  	"expertises_id" integer,
  	"articles_id" integer,
  	"bookings_id" integer,
  	"job_applications_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "avocats" ADD CONSTRAINT "avocats_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "avocats_rels" ADD CONSTRAINT "avocats_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."avocats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "avocats_rels" ADD CONSTRAINT "avocats_rels_expertises_fk" FOREIGN KEY ("expertises_id") REFERENCES "public"."expertises"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_expertise_id_expertises_id_fk" FOREIGN KEY ("expertise_id") REFERENCES "public"."expertises"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_avocats_fk" FOREIGN KEY ("avocats_id") REFERENCES "public"."avocats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_avocat_id_avocats_id_fk" FOREIGN KEY ("avocat_id") REFERENCES "public"."avocats"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_target_expertise_id_expertises_id_fk" FOREIGN KEY ("target_expertise_id") REFERENCES "public"."expertises"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_avocats_fk" FOREIGN KEY ("avocats_id") REFERENCES "public"."avocats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_expertises_fk" FOREIGN KEY ("expertises_id") REFERENCES "public"."expertises"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_applications_fk" FOREIGN KEY ("job_applications_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "avocats_slug_idx" ON "avocats" USING btree ("slug");
  CREATE INDEX "avocats_photo_idx" ON "avocats" USING btree ("photo_id");
  CREATE INDEX "avocats_updated_at_idx" ON "avocats" USING btree ("updated_at");
  CREATE INDEX "avocats_created_at_idx" ON "avocats" USING btree ("created_at");
  CREATE INDEX "avocats_rels_order_idx" ON "avocats_rels" USING btree ("order");
  CREATE INDEX "avocats_rels_parent_idx" ON "avocats_rels" USING btree ("parent_id");
  CREATE INDEX "avocats_rels_path_idx" ON "avocats_rels" USING btree ("path");
  CREATE INDEX "avocats_rels_expertises_id_idx" ON "avocats_rels" USING btree ("expertises_id");
  CREATE UNIQUE INDEX "expertises_slug_idx" ON "expertises" USING btree ("slug");
  CREATE INDEX "expertises_updated_at_idx" ON "expertises" USING btree ("updated_at");
  CREATE INDEX "expertises_created_at_idx" ON "expertises" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_expertise_idx" ON "articles" USING btree ("expertise_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_avocats_id_idx" ON "articles_rels" USING btree ("avocats_id");
  CREATE INDEX "bookings_avocat_idx" ON "bookings" USING btree ("avocat_id");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX "job_applications_target_expertise_idx" ON "job_applications" USING btree ("target_expertise_id");
  CREATE INDEX "job_applications_updated_at_idx" ON "job_applications" USING btree ("updated_at");
  CREATE INDEX "job_applications_created_at_idx" ON "job_applications" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_avocats_id_idx" ON "payload_locked_documents_rels" USING btree ("avocats_id");
  CREATE INDEX "payload_locked_documents_rels_expertises_id_idx" ON "payload_locked_documents_rels" USING btree ("expertises_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_locked_documents_rels_job_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("job_applications_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "avocats" CASCADE;
  DROP TABLE "avocats_rels" CASCADE;
  DROP TABLE "expertises" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "job_applications" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_articles_type";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_bookings_location";
  DROP TYPE "public"."enum_bookings_status";
  DROP TYPE "public"."enum_job_applications_status";`)
}

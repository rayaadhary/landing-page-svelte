DROP TABLE IF EXISTS "hero_slides";
--> statement-breakpoint
CREATE TABLE "hero" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_prefix" varchar(255) NOT NULL,
	"title_highlight" varchar(255) NOT NULL,
	"highlight_color" varchar(50) DEFAULT '#0155FF' NOT NULL,
	"description" text NOT NULL,
	"cta_primary_label" varchar(255) NOT NULL,
	"cta_primary_href" text DEFAULT '' NOT NULL,
	"cta_secondary_label" varchar(255) NOT NULL,
	"cta_secondary_href" varchar(500) DEFAULT '#layanan' NOT NULL,
	"stats" jsonb DEFAULT '[]'::jsonb NOT NULL
);

import {
	pgTable,
	serial,
	text,
	varchar,
	integer,
	boolean,
	timestamp,
	jsonb
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: serial('id').primaryKey(),
	token: varchar('token', { length: 64 }).notNull().unique(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const hero = pgTable('hero', {
	id: serial('id').primaryKey(),
	titlePrefix: varchar('title_prefix', { length: 255 }).notNull(),
	titleHighlight: varchar('title_highlight', { length: 255 }).notNull(),
	highlightColor: varchar('highlight_color', { length: 50 }).default('#0155FF').notNull(),
	description: text('description').notNull(),
	ctaPrimaryLabel: varchar('cta_primary_label', { length: 255 }).notNull(),
	ctaPrimaryHref: text('cta_primary_href').default('').notNull(),
	ctaSecondaryLabel: varchar('cta_secondary_label', { length: 255 }).notNull(),
	ctaSecondaryHref: varchar('cta_secondary_href', { length: 500 }).default('#layanan').notNull(),
	stats: jsonb('stats').$type().default([]).notNull()
});

export const products = pgTable('products', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	tagline: varchar('tagline', { length: 255 }).default('').notNull(),
	overview: text('overview').notNull(),
	content: text('content').default('').notNull(),
	image: varchar('image', { length: 500 }).default('').notNull(),
	screenshots: jsonb('screenshots').$type().default([]).notNull(),
	modules: jsonb('modules').$type().default([]).notNull(),
	pricing: jsonb('pricing').$type().default([]).notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	active: boolean('active').default(true).notNull()
});

export const features = pgTable('features', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	iconName: varchar('icon_name', { length: 100 }).notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	active: boolean('active').default(true).notNull()
});

export const testimonials = pgTable('testimonials', {
	id: serial('id').primaryKey(),
	quote: text('quote').notNull(),
	clientName: varchar('client_name', { length: 255 }).notNull(),
	clientRole: varchar('client_role', { length: 255 }).notNull(),
	avatarLetter: varchar('avatar_letter', { length: 10 }).notNull(),
	avatarColor: varchar('avatar_color', { length: 50 }).notNull(),
	projectName: varchar('project_name', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).default('').notNull(),
	image: varchar('image', { length: 500 }).default('').notNull(),
	rating: integer('rating').default(5).notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	active: boolean('active').default(true).notNull()
});

export const faqs = pgTable('faqs', {
	id: serial('id').primaryKey(),
	question: text('question').notNull(),
	answer: text('answer').notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	active: boolean('active').default(true).notNull()
});

export const blogPosts = pgTable('blog_posts', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	image: varchar('image', { length: 500 }).notNull(),
	author: varchar('author', { length: 255 }).notNull(),
	date: varchar('date', { length: 20 }).notNull(),
	readTime: varchar('read_time', { length: 50 }).notNull(),
	excerpt: text('excerpt').notNull(),
	content: text('content').notNull(),
	metaDescription: text('meta_description'),
	tags: text('tags'),
	active: boolean('active').default(true).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const demoRequests = pgTable('demo_requests', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).default('').notNull(),
	companyName: varchar('company_name', { length: 255 }).default('').notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull(),
	message: text('message').default('').notNull(),
	productSlug: varchar('product_slug', { length: 255 }).default('').notNull(),
	productTitle: varchar('product_title', { length: 255 }).default('').notNull(),
	status: varchar('status', { length: 20 }).default('baru').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const settings = pgTable('settings', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 255 }).notNull().unique(),
	value: text('value').notNull()
});

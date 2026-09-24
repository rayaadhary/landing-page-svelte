import { pgTable, serial, text, varchar, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
	id: serial('id').primaryKey(),
	token: varchar('token', { length: 64 }).notNull().unique(),
	userId: integer('user_id').references(() => users.id).notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const heroSlides = pgTable('hero_slides', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	subtitle: varchar('subtitle', { length: 255 }).notNull(),
	description: text('description').notNull(),
	svgHtml: text('svg_html').notNull(),
	color: varchar('color', { length: 50 }).notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	active: boolean('active').default(true).notNull()
});

export const products = pgTable('products', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	category: varchar('category', { length: 255 }).notNull(),
	overview: text('overview').notNull(),
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

export const settings = pgTable('settings', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 255 }).notNull().unique(),
	value: text('value').notNull()
});

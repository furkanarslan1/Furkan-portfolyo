import { pgTable, serial, text, jsonb, integer, boolean, timestamp, varchar } from 'drizzle-orm/pg-core'

export type MultiLang = { tr: string; en: string }

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: jsonb('title').$type<MultiLang>().notNull(),
  shortDescription: jsonb('short_description').$type<MultiLang>().notNull(),
  description: jsonb('description').$type<MultiLang>().notNull(),
  imageUrl: text('image_url').notNull(),
  imagePublicId: text('image_public_id').notNull(),
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  tags: text('tags').array().default([]).notNull(),
  order: integer('order').default(0).notNull(),
  published: boolean('published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon'),
  order: integer('order').default(0).notNull(),
})

export const galleryImages = pgTable('gallery_images', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  imagePublicId: text('image_public_id').notNull(),
  caption: text('caption'),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const sectionContent = pgTable('section_content', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 50 }).unique().notNull(),
  content: jsonb('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
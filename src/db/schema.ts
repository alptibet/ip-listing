import {
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['Assigned', 'Not Assigned']);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 16 }).notNull().unique(),
});

export const projectRelations = relations(projects, ({ many }) => ({
  devices: many(devices),
}));

export const devices = pgTable('devices', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 16 }),
  location: varchar('location', { length: 16 }),
  ipAddress: varchar('ip_address'),
  subnet: varchar('subnet'),
  gateway: varchar('gateway'),
  status: statusEnum('status').default('Not Assigned'),
  system: varchar('system'),
  projectId: integer('project_id'),
});

export type Device = typeof devices.$inferSelect;

export const deviceRelations = relations(devices, ({ one }) => ({
  project: one(projects, {
    fields: [devices.projectId],
    references: [projects.id],
  }),
}));

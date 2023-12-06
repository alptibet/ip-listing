import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['Assigned', 'Not Assigned']);
export const roleEnum = pgEnum('userRole', [
  'superadmin',
  'admin',
  'superuser',
  'user',
]);

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
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
});

export const deviceRelations = relations(devices, ({ one }) => ({
  project: one(projects, {
    fields: [devices.projectId],
    references: [projects.id],
  }),
}));

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username').notNull().unique(),
  password: varchar('password').notNull(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  isActive: boolean('is_active').notNull().default(false),
  userRole: roleEnum('user_role').notNull().default('user'),
});

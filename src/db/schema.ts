import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['Assigned', 'Not Assigned']);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 16 }),
});

export const deviceRelations = relations(projects, ({ many }) => ({
  devices: many(devices),
}));

export const devices = pgTable('devices', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 16 }),
  location: varchar('location', { length: 16 }),
  ipAddress: varchar('ip_address'),
  subnet: varchar('subnet'),
  netmask: varchar('netmask'),
  gateway: varchar('gateway'),
  status: statusEnum('status'),
  system: varchar('system'),
  projectId: integer('project_id').references(() => projects.id),
});

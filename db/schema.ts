import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const menuCategories = sqliteTable("menu_categories", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  note: text("note").notNull().default(""),
  tone: text("tone", { enum: ["green", "orange"] }).notNull().default("green"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_menu_categories_sort").on(table.sortOrder)]);

export const menuItems = sqliteTable("menu_items", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").notNull().references(() => menuCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  detail: text("detail").notNull().default(""),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_menu_items_category_visible_sort").on(table.categoryId, table.isVisible, table.sortOrder)]);

export const adminCredentials = sqliteTable("admin_credentials", {
  email: text("email").primaryKey(),
  passwordHash: text("password_hash").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const adminRecoveryCodes = sqliteTable("admin_recovery_codes", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  codeHash: text("code_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  usedAt: integer("used_at", { mode: "timestamp_ms" }),
}, (table) => [index("idx_admin_recovery_email_unused").on(table.email, table.usedAt)]);

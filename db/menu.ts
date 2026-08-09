import { getD1 } from "./index";

export type MenuItemRecord = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  detail: string;
  price: string;
  imageUrl: string;
  isVisible: boolean;
  sortOrder: number;
};

export type MenuCategoryRecord = {
  id: string;
  title: string;
  note: string;
  tone: "green" | "orange";
  sortOrder: number;
  items: MenuItemRecord[];
};

type SeedCategory = Omit<MenuCategoryRecord, "sortOrder" | "items"> & {
  items: Array<{ name: string; description?: string; detail?: string; price: string }>;
};

type CategoryRow = Omit<MenuCategoryRecord, "items">;
type ItemRow = Omit<MenuItemRecord, "isVisible"> & { isVisible: number };

const categoryTableSql = `CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT 'green',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)`;

const itemTableSql = `CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY NOT NULL,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  is_visible INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE
)`;

async function ensureMenuTables() {
  const d1 = getD1();
  await d1.batch([
    d1.prepare(categoryTableSql),
    d1.prepare(itemTableSql),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_menu_categories_sort ON menu_categories(sort_order)"),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_menu_items_category_visible_sort ON menu_items(category_id, is_visible, sort_order)"),
  ]);
}

export async function seedMenuIfEmpty(categories: SeedCategory[]) {
  await ensureMenuTables();
  const d1 = getD1();
  const count = await d1.prepare("SELECT COUNT(*) AS total FROM menu_categories").first<{ total: number }>();
  if ((count?.total ?? 0) > 0) return;

  const now = Date.now();
  const statements = categories.flatMap((category, categoryIndex) => {
    const categoryStatement = d1.prepare(
      "INSERT INTO menu_categories (id, title, note, tone, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(category.id, category.title, category.note, category.tone, categoryIndex, now, now);
    const itemStatements = category.items.map((item, itemIndex) => d1.prepare(
      "INSERT INTO menu_items (id, category_id, name, description, detail, price, image_url, is_visible, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, '', 1, ?, ?, ?)"
    ).bind(`${category.id}-${itemIndex + 1}`, category.id, item.name, item.description ?? "Description demo", item.detail ?? "", item.price, itemIndex, now, now));
    return [categoryStatement, ...itemStatements];
  });
  await d1.batch(statements);
}

export async function readMenu(includeHidden = false): Promise<MenuCategoryRecord[]> {
  await ensureMenuTables();
  const d1 = getD1();
  const [categoryResult, itemResult] = await Promise.all([
    d1.prepare("SELECT id, title, note, tone, sort_order AS sortOrder FROM menu_categories ORDER BY sort_order, title").all<CategoryRow>(),
    d1.prepare(`SELECT id, category_id AS categoryId, name, description, detail, price, image_url AS imageUrl,
      is_visible AS isVisible, sort_order AS sortOrder FROM menu_items
      ${includeHidden ? "" : "WHERE is_visible = 1"} ORDER BY category_id, sort_order, name`).all<ItemRow>(),
  ]);
  const items = (itemResult.results ?? []).map((item) => ({ ...item, isVisible: Boolean(item.isVisible) }));
  return (categoryResult.results ?? []).map((category) => ({
    ...category,
    tone: category.tone === "orange" ? "orange" : "green",
    items: items.filter((item) => item.categoryId === category.id),
  }));
}

export async function createMenuItem(input: Omit<MenuItemRecord, "id">) {
  await ensureMenuTables();
  const d1 = getD1();
  const id = crypto.randomUUID();
  const now = Date.now();
  await d1.prepare(`INSERT INTO menu_items
    (id, category_id, name, description, detail, price, image_url, is_visible, sort_order, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, input.categoryId, input.name, input.description, input.detail, input.price, input.imageUrl, input.isVisible ? 1 : 0, input.sortOrder, now, now).run();
  return id;
}

export async function updateMenuItem(id: string, input: Omit<MenuItemRecord, "id">) {
  await ensureMenuTables();
  await getD1().prepare(`UPDATE menu_items SET category_id = ?, name = ?, description = ?, detail = ?, price = ?,
    image_url = ?, is_visible = ?, sort_order = ?, updated_at = ? WHERE id = ?`)
    .bind(input.categoryId, input.name, input.description, input.detail, input.price, input.imageUrl, input.isVisible ? 1 : 0, input.sortOrder, Date.now(), id).run();
}

export async function deleteMenuItem(id: string) {
  await ensureMenuTables();
  await getD1().prepare("DELETE FROM menu_items WHERE id = ?").bind(id).run();
}

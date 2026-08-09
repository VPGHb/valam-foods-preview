"use client";

import { useState } from "react";
import { CheckCircle, Eye, EyeSlash, ImageSquare, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import type { MenuCategoryRecord, MenuItemRecord } from "@/db/menu";

type EditableItem = Omit<MenuItemRecord, "id">;

const blankItem = (categoryId: string): EditableItem => ({
  categoryId,
  name: "",
  description: "",
  detail: "",
  price: "",
  imageUrl: "",
  isVisible: true,
  sortOrder: 0,
});

function ItemFields({ value, categories, onChange }: { value: EditableItem; categories: MenuCategoryRecord[]; onChange: (value: EditableItem) => void }) {
  const set = <K extends keyof EditableItem>(key: K, next: EditableItem[K]) => onChange({ ...value, [key]: next });
  return (
    <div className="admin-fields">
      <label className="admin-field-span-2">Item name<input value={value.name} onChange={(event) => set("name", event.target.value)} required /></label>
      <label>Category<select value={value.categoryId} onChange={(event) => set("categoryId", event.target.value)}>{categories.map((category) => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
      <label>Price<input value={value.price} onChange={(event) => set("price", event.target.value)} placeholder="$7.99" required /></label>
      <label className="admin-field-span-2">Description<textarea value={value.description} onChange={(event) => set("description", event.target.value)} rows={3} placeholder="Short description shown on the menu" /></label>
      <label>Size or quantity<input value={value.detail} onChange={(event) => set("detail", event.target.value)} placeholder="10 pc or S / M / L" /></label>
      <label>Display order<input type="number" value={value.sortOrder} onChange={(event) => set("sortOrder", Number(event.target.value))} /></label>
      <label className="admin-field-span-2">Photo URL <span>Optional for now</span><input type="url" value={value.imageUrl} onChange={(event) => set("imageUrl", event.target.value)} placeholder="Leave empty to show the branded placeholder" /></label>
      <label className="admin-checkbox admin-field-span-2"><input type="checkbox" checked={value.isVisible} onChange={(event) => set("isVisible", event.target.checked)} /><span>Show this item on the public menu</span></label>
    </div>
  );
}

function MenuEditor({ item, categories, onUpdated, onDeleted }: { item: MenuItemRecord; categories: MenuCategoryRecord[]; onUpdated: () => Promise<void>; onDeleted: () => Promise<void> }) {
  const [draft, setDraft] = useState<EditableItem>({ ...item });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch(`/api/admin/menu/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    setSaving(false);
    if (!response.ok) return setMessage("Could not save this item.");
    setMessage("Saved");
    await onUpdated();
  }

  async function remove() {
    if (!window.confirm(`Remove ${item.name} from the menu?`)) return;
    setSaving(true);
    const response = await fetch(`/api/admin/menu/${item.id}`, { method: "DELETE" });
    setSaving(false);
    if (!response.ok) return setMessage("Could not remove this item.");
    await onDeleted();
  }

  return (
    <details className="admin-item">
      <summary>
        <span className="admin-item-photo">{item.imageUrl ? <ImageSquare size={24} weight="duotone" /> : <ImageSquare size={24} />}</span>
        <span className="admin-item-name"><strong>{item.name}</strong><small>{item.detail || "No quantity"} · {item.price}</small></span>
        <span className={`admin-visibility ${item.isVisible ? "visible" : "hidden"}`}>{item.isVisible ? <Eye size={17} /> : <EyeSlash size={17} />}{item.isVisible ? "Visible" : "Hidden"}</span>
        <PencilSimple className="admin-edit-icon" size={20} aria-hidden="true" />
      </summary>
      <div className="admin-item-editor">
        <ItemFields value={draft} categories={categories} onChange={setDraft} />
        <div className="admin-editor-actions">
          <button className="admin-primary-button" type="button" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
          <button className="admin-delete-button" type="button" onClick={remove} disabled={saving}><Trash size={18} />Remove item</button>
          {message && <span className={message === "Saved" ? "admin-success" : "admin-error"}>{message === "Saved" && <CheckCircle size={18} weight="fill" />}{message}</span>}
        </div>
      </div>
    </details>
  );
}

export default function MenuManager({ initialCategories }: { initialCategories: MenuCategoryRecord[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newItem, setNewItem] = useState<EditableItem>(blankItem(initialCategories[0]?.id ?? ""));
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState(initialCategories[0]?.id ?? "all");
  const [notice, setNotice] = useState("");

  async function refresh() {
    const response = await fetch("/api/admin/menu", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json() as { categories: MenuCategoryRecord[] };
    setCategories(data.categories);
  }

  async function addItem() {
    setAdding(true); setNotice("");
    const response = await fetch("/api/admin/menu", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newItem) });
    setAdding(false);
    if (!response.ok) return setNotice("Please add a category, item name and price.");
    setNewItem(blankItem(newItem.categoryId));
    setNotice("Item added to the menu.");
    await refresh();
  }

  const visibleCategories = filter === "all" ? categories : categories.filter((category) => category.id === filter);
  const itemCount = categories.reduce((count, category) => count + category.items.length, 0);

  return (
    <div className="admin-content">
      <section className="admin-intro">
        <div><p className="admin-kicker">Food and pricing</p><h1>Manage the menu</h1><p>{itemCount} items across {categories.length} categories. Updates appear on the public menu after saving.</p></div>
        <a className="admin-secondary-button" href="/#menu" target="_blank" rel="noreferrer">View public menu</a>
      </section>

      <details className="admin-add-card">
        <summary><Plus size={22} weight="bold" />Add a menu item</summary>
        <div className="admin-add-body">
          <ItemFields value={newItem} categories={categories} onChange={setNewItem} />
          <div className="admin-editor-actions"><button className="admin-primary-button" type="button" onClick={addItem} disabled={adding}>{adding ? "Adding..." : "Add item"}</button>{notice && <span className={notice.startsWith("Item") ? "admin-success" : "admin-error"}>{notice}</span>}</div>
        </div>
      </details>

      <nav className="admin-filters" aria-label="Filter menu categories">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All items</button>
        {categories.map((category) => <button className={filter === category.id ? "active" : ""} key={category.id} onClick={() => setFilter(category.id)}>{category.title}</button>)}
      </nav>

      <div className="admin-category-list">
        {visibleCategories.map((category) => (
          <section className="admin-category" key={category.id}>
            <header><div><h2>{category.title}</h2><p>{category.note}</p></div><span>{category.items.length} items</span></header>
            <div className="admin-items">{category.items.map((item) => <MenuEditor key={item.id} item={item} categories={categories} onUpdated={refresh} onDeleted={refresh} />)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

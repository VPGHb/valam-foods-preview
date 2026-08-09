"use client";

import { useState } from "react";
import { CheckCircle, DownloadSimple, Eye, EyeSlash, ImageSquare, Key, PencilSimple, Plus, Trash, UploadSimple } from "@phosphor-icons/react";
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const set = <K extends keyof EditableItem>(key: K, next: EditableItem[K]) => onChange({ ...value, [key]: next });

  async function uploadPhoto(file: File | undefined) {
    if (!file) return;
    setUploading(true); setUploadError("");
    const body = new FormData(); body.set("photo", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const result = await response.json() as { url?: string; error?: string };
    setUploading(false);
    if (!response.ok || !result.url) return setUploadError(result.error ?? "Could not upload this photo.");
    set("imageUrl", result.url);
  }

  return (
    <div className="admin-fields">
      <label className="admin-field-span-2">Item name<input value={value.name} onChange={(event) => set("name", event.target.value)} required /></label>
      <label>Category<select value={value.categoryId} onChange={(event) => set("categoryId", event.target.value)}>{categories.map((category) => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
      <label>Price<input value={value.price} onChange={(event) => set("price", event.target.value)} placeholder="$7.99" required /></label>
      <label className="admin-field-span-2">Description<textarea value={value.description} onChange={(event) => set("description", event.target.value)} rows={3} placeholder="Short description shown on the menu" /></label>
      <label>Size or quantity<input value={value.detail} onChange={(event) => set("detail", event.target.value)} placeholder="10 pc or S / M / L" /></label>
      <label>Display order<input type="number" value={value.sortOrder} onChange={(event) => set("sortOrder", Number(event.target.value))} /></label>
      <label className="admin-field-span-2 admin-photo-field">Food photo <span>JPG, PNG, WebP or AVIF · maximum 5 MB</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => uploadPhoto(event.target.files?.[0])} disabled={uploading} />
        <small className={uploadError ? "admin-error" : "admin-upload-status"}>{uploadError || (uploading ? "Uploading photo..." : value.imageUrl ? "Photo uploaded and ready to save." : "No photo selected. The branded placeholder will remain.")}</small>
      </label>
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
  const [securityNotice, setSecurityNotice] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

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

  async function restoreBackup(file: File | undefined) {
    if (!file || !window.confirm("Restore this backup? The current menu will be replaced.")) return;
    const body = new FormData(); body.set("backup", file);
    setSecurityNotice("Restoring backup...");
    const response = await fetch("/api/admin/backup", { method: "POST", body });
    const result = await response.json() as { error?: string };
    if (!response.ok) return setSecurityNotice(result.error ?? "Could not restore the backup.");
    setSecurityNotice("Backup restored successfully.");
    await refresh();
  }

  async function createRecoveryCodes() {
    if (!window.confirm("Generate new recovery codes? Any older codes will stop working.")) return;
    setSecurityNotice("Generating recovery codes...");
    const response = await fetch("/api/admin/recovery-codes", { method: "POST" });
    const result = await response.json() as { codes?: string[] };
    if (!response.ok || !result.codes) return setSecurityNotice("Could not generate recovery codes.");
    setRecoveryCodes(result.codes);
    setSecurityNotice("Save these codes somewhere private. They are shown only once.");
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

      <details className="admin-tools-card">
        <summary><Key size={22} weight="bold" />Backups and account recovery</summary>
        <div className="admin-tools-body">
          <div className="admin-tool">
            <div><strong>Download menu backup</strong><p>Save all categories, items, prices and photo references as a JSON file.</p></div>
            <a className="admin-secondary-button" href="/api/admin/backup"><DownloadSimple size={18} />Download</a>
          </div>
          <div className="admin-tool">
            <div><strong>Restore menu backup</strong><p>Replace the current menu with a previously downloaded backup.</p></div>
            <label className="admin-secondary-button admin-file-button"><UploadSimple size={18} />Choose backup<input type="file" accept="application/json,.json" onChange={(event) => restoreBackup(event.target.files?.[0])} /></label>
          </div>
          <div className="admin-tool">
            <div><strong>Recovery codes</strong><p>Generate eight one-time codes for resetting the admin password.</p></div>
            <button className="admin-secondary-button" type="button" onClick={createRecoveryCodes}><Key size={18} />Generate codes</button>
          </div>
          {securityNotice && <p className="admin-security-notice" role="status">{securityNotice}</p>}
          {recoveryCodes.length > 0 && <div className="admin-recovery-codes"><strong>One-time recovery codes</strong><div>{recoveryCodes.map((code) => <code key={code}>{code}</code>)}</div><button type="button" className="admin-secondary-button" onClick={() => navigator.clipboard.writeText(recoveryCodes.join("\n"))}>Copy codes</button></div>}
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

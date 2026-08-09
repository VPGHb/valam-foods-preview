import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readMenu } from "@/db/menu";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import MenuManager from "./menu-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const email = await verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!email) redirect("/admin/login");
  const categories = await readMenu(true);

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link className="admin-brand" href="/"><Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={108} height={108} priority /></Link>
        <div><span>Menu manager</span><small>Signed in as {email}</small></div>
        <form action="/api/admin/logout" method="post"><button className="admin-secondary-button" type="submit">Sign out</button></form>
      </header>
      <MenuManager initialCategories={categories} />
    </main>
  );
}

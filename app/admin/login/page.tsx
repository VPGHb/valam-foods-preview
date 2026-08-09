import Image from "next/image";
import Link from "next/link";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link href="/" aria-label="Back to VALAM FOODS"><Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={126} height={126} priority /></Link>
        <p className="admin-kicker">Private menu manager</p>
        <h1>Welcome back</h1>
        <p>Sign in to update menu items, quantities, descriptions and prices.</p>
        {error && <div className="admin-alert" role="alert">The email or password is incorrect.</div>}
        <form action="/api/admin/login" method="post" className="admin-login-form">
          <label>Email address<input type="email" name="email" autoComplete="username" required /></label>
          <label>Password<input type="password" name="password" autoComplete="current-password" required /></label>
          <button type="submit">Sign in</button>
        </form>
        <Link className="admin-back-link" href="/">Back to the website</Link>
      </section>
    </main>
  );
}

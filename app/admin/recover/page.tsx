import Image from "next/image";
import Link from "next/link";

export default async function RecoverAdmin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link href="/" aria-label="Back to VALAM FOODS"><Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={126} height={126} priority /></Link>
        <p className="admin-kicker">Account recovery</p>
        <h1>Reset access</h1>
        <p>Enter one unused recovery code and choose a new password of at least 12 characters.</p>
        {error && <div className="admin-alert" role="alert">{error === "password" ? "Passwords must match and contain at least 12 characters." : "The email or recovery code is invalid."}</div>}
        <form action="/api/admin/recover" method="post" className="admin-login-form">
          <label>Email address<input type="email" name="email" autoComplete="username" required /></label>
          <label>Recovery code<input name="code" autoComplete="one-time-code" required /></label>
          <label>New password<input type="password" name="password" autoComplete="new-password" minLength={12} required /></label>
          <label>Confirm new password<input type="password" name="confirmPassword" autoComplete="new-password" minLength={12} required /></label>
          <button type="submit">Reset password</button>
        </form>
        <Link className="admin-back-link" href="/admin/login">Back to sign in</Link>
      </section>
    </main>
  );
}

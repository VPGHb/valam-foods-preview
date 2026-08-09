import Image from "next/image";

export default function Loading() {
  return (
    <main className="loading-page" aria-live="polite" aria-busy="true">
      <div className="loading-card">
        <Image
          className="loading-logo"
          src="/valam-foods-logo.png"
          alt="VALAM FOODS"
          width={150}
          height={150}
          priority
        />
        <p className="eyebrow">VALAM FOODS · ISELIN, NJ</p>
        <h1>Preparing the menu</h1>
        <div className="loading-track" aria-hidden="true"><span /></div>
        <p className="loading-note">Fresh flavors are just a moment away.</p>
      </div>
    </main>
  );
}

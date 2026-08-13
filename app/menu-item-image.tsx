"use client";

import { useEffect, useState } from "react";

type ImageStatus = "checking" | "loaded" | "unavailable";

type MenuItemImageProps = {
  src?: string;
  alt: string;
  itemName: string;
};

export function MenuItemImage({ src, alt, itemName }: MenuItemImageProps) {
  const [status, setStatus] = useState<ImageStatus>(src ? "checking" : "unavailable");

  useEffect(() => {
    setStatus(src ? "checking" : "unavailable");
  }, [src]);

  return (
    <>
      <div
        className={`menu-photo-fallback ${status === "loaded" ? "is-hidden" : ""}`}
        role="img"
        aria-label={`${itemName} menu image unavailable.`}
        aria-hidden={status !== "unavailable"}
      >
        <span className="fallback-dish" aria-hidden="true"><i /></span>
        <strong>{status === "checking" ? "Loading image" : itemName}</strong>
        <small>VALAM FOODS</small>
      </div>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={status === "loaded" ? "is-loaded" : ""}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("unavailable")}
        />
      )}
    </>
  );
}

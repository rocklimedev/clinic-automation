import { useState } from "react";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

const PALETTE = [
  "bg-brand-100 text-brand-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
];

function hashColor(name = "") {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash + name.charCodeAt(i)) % PALETTE.length;
  }

  return PALETTE[hash];
}

const sizes = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

export function Avatar({ src, alt, name = "", size = "md", className }) {
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full shrink-0",
        sizes[size],
        className,
      )}
    >
      {showFallback ? (
        <AvatarFallback name={name} size={size} />
      ) : (
        <img
          src={src}
          alt={alt || name}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export function AvatarFallback({ name = "", size = "md", className }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full font-semibold",
        sizes[size],
        hashColor(name),
        className,
      )}
    >
      {initials(name) || "?"}
    </div>
  );
}

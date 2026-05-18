import Image from "next/image";

export function EclipseLogo({ size = 80 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Eclipse FM 107.7"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}

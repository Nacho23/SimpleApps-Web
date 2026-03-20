import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Logos bajo `/apps/…`: se sirven sin el optimizador para que, al reemplazar el
 * archivo en `public/`, no quedes atrapado en caché de `/_next/image`.
 * `object-contain` evita recortes raros con íconos y fondos blancos.
 */
export function AppLogoImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: Props) {
  const isPublicAppAsset = src.startsWith("/apps/");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isPublicAppAsset}
      className={
        isPublicAppAsset
          ? `object-contain ${className}`.trim()
          : `object-cover ${className}`.trim()
      }
    />
  );
}

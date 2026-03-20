import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { collectTags, getApps } from "@/lib/apps";

export const metadata: Metadata = {
  description:
    "Busca y filtra apps por etiqueta. Consulta las últimas novedades y abre la ficha con capturas.",
};

export default function Home() {
  const apps = getApps();
  const allTags = collectTags(apps);

  return <Catalog apps={apps} allTags={allTags} />;
}

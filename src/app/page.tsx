import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { HomeHero } from "@/components/HomeHero";
import { OpenAiKeyGuide } from "@/components/OpenAiKeyGuide";
import { OpenAiKeyNotice } from "@/components/OpenAiKeyNotice";
import { ParticipaSection } from "@/components/ParticipaSection";
import { collectTags, getApps } from "@/lib/apps";

export const metadata: Metadata = {
  description:
    "Explora apps gratuitas, filtra por etiqueta y configura tu clave de OpenAI para las funciones con IA.",
};

export default function Home() {
  const apps = getApps();
  const allTags = collectTags(apps);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <HomeHero appsCount={apps.length} />
      <OpenAiKeyNotice />
      <Catalog apps={apps} allTags={allTags} />
      <ParticipaSection />
      <OpenAiKeyGuide />
    </div>
  );
}

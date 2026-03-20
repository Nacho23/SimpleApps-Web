import appsData from "@/data/apps.json";
import type { MobileApp } from "@/types/app";

const apps = appsData as MobileApp[];

export function getApps(): MobileApp[] {
  return apps;
}

export function getAppBySlug(slug: string): MobileApp | undefined {
  return apps.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return apps.map((a) => a.slug);
}

export function getSlugsWithPrivacyPolicy(): string[] {
  return apps.filter((a) => a.privacy_policy).map((a) => a.slug);
}

export function collectTags(list: MobileApp[]): string[] {
  const set = new Set<string>();
  for (const app of list) {
    for (const tag of app.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

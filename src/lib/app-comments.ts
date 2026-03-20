import { Redis } from "@upstash/redis";
import type { AppComment } from "@/types/app-comment";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isCommentsStorageConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

function keyForSlug(slug: string) {
  return `app-comments:${slug}`;
}

const MAX_COMMENTS = 200;

function parseStoredComment(raw: unknown): AppComment | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "object" && "id" in raw && "body" in raw) {
    return raw as AppComment;
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && "id" in parsed && "body" in parsed) {
        return parsed as AppComment;
      }
    } catch {
      return null;
    }
  }
  return null;
}

export async function listCommentsForSlug(slug: string): Promise<AppComment[]> {
  const r = getRedis();
  if (!r) return [];
  const items = await r.lrange(keyForSlug(slug), 0, MAX_COMMENTS - 1);
  const out: AppComment[] = [];
  for (const raw of items) {
    const c = parseStoredComment(raw);
    if (c) out.push(c);
  }
  return out;
}

export async function appendComment(comment: AppComment): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("STORAGE_NOT_CONFIGURED");
  const k = keyForSlug(comment.appSlug);
  await r.lpush(k, JSON.stringify(comment));
  await r.ltrim(k, 0, MAX_COMMENTS - 1);
}

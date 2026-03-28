import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { appendComment } from "@/lib/app-comments";

export const runtime = "nodejs";
import { getAppBySlug } from "@/lib/apps";
import type { FeedbackKind } from "@/types/app-comment";

const KINDS: FeedbackKind[] = ["mejora", "error", "otro"];

type Body = {
  kind?: string;
  message?: string;
  name?: string;
};

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
  }

  const app = getAppBySlug(slug);
  if (!app) {
    return NextResponse.json({ error: "App no encontrada" }, { status: 404 });
  }

  let json: Body;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const kind = json.kind as FeedbackKind;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  const message = typeof json.message === "string" ? json.message.trim() : "";
  if (message.length < 2) {
    return NextResponse.json(
      { error: "El mensaje es demasiado corto" },
      { status: 400 },
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "El mensaje no puede superar 2000 caracteres" },
      { status: 400 },
    );
  }

  const nameRaw = typeof json.name === "string" ? json.name.trim() : "";
  const authorName = nameRaw.length > 0 ? nameRaw.slice(0, 80) : null;

  const row = {
    id: crypto.randomUUID(),
    appSlug: slug,
    kind,
    body: message,
    authorName,
    createdAt: new Date().toISOString(),
  };

  try {
    await appendComment(row);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg === "STORAGE_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Comentarios en página no configurados (Redis)" },
        { status: 503 },
      );
    }
    throw e;
  }

  revalidatePath(`/apps/${slug}`);

  return NextResponse.json({ ok: true, id: row.id });
}

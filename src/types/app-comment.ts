export type FeedbackKind = "mejora" | "error" | "otro";

/** Comentario público (sin email persistido). */
export type AppComment = {
  id: string;
  appSlug: string;
  kind: FeedbackKind;
  body: string;
  authorName: string | null;
  createdAt: string;
};

export function getContactEmail(): string {
  const v = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return typeof v === "string" ? v.trim() : "";
}

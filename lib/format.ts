/**
 * Mengubah slug menjadi judul (title case).
 */
export const formatSlugToTitle = (text: string) => {
  if (!text) return "";
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

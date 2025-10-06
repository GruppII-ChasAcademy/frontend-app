export const isToday = (iso?: string) => {
  if (!iso) return false;
  const a = new Date(iso).toLocaleDateString("sv-SE");
  const b = new Date().toLocaleDateString("sv-SE");
  return a === b;
};

export const findMatchesItems = <T = unknown>(
  items1: T[] | undefined,
  items2: T[] | undefined,
  key: keyof T
): T[] => {
  if (!items1) {
    return items2 ?? [];
  }
  if (!items2) {
    return items1 ?? [];
  }

  const items2Keys = new Set(items2.map((meal) => meal[key]));
  return items1.filter((item) => items2Keys.has(item[key]));
};

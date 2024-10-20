export const searchByKey = <T = unknown,>(
  arr: T[] = [],
  key: keyof T,
  search: string = ''
): T[] => {
  const lowSearch = search.toLocaleLowerCase();
  const searchedArr = arr.filter((item) =>
    String(item[key] ?? '')
      .toLocaleLowerCase()
      .includes(lowSearch)
  );
  return searchedArr;
};

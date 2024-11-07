export const capitalize = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1);
};
export const formatText = (word: string): string => {
  const temparr = word.split('_');
  return temparr.map((el) => capitalize(el)).join(' ');
};

export const getQueryStringByObject = <T extends Object>(
  paramsObj: T,
  exclude?: string[]
): string => {
  const clearObj = { ...paramsObj };
  if (exclude && exclude.length > 0) {
    exclude.forEach((el) => {
      if (el in clearObj) {
        delete clearObj[el as keyof typeof clearObj];
      }
    });
  }
  const searchParams = new URLSearchParams(
    clearObj as never as Record<string, string>
  ).toString();
  return searchParams ? `?${searchParams}` : searchParams;
};

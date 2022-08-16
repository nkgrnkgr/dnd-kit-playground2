export const insertToArray = <T>(
  array: T[],
  targetElement: T,
  insertIndex: number
): T[] => {
  const pre = array.slice(0, insertIndex);
  const after = array.slice(insertIndex, array.length);

  return [...pre, targetElement, ...after];
};

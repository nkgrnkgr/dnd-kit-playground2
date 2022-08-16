export const replaceArrayElements = <T>(
  array: T[],
  targetIndex: number,
  sourceIndex: number
) => {
  const cloneArray = [...array];
  [cloneArray[targetIndex], cloneArray[sourceIndex]] = [
    array[sourceIndex],
    array[targetIndex],
  ];
  return cloneArray;
};

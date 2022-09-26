type Assert = (value: unknown) => asserts value;

export const assertValue: Assert = (value) => {
  if (!value) {
    throw new Error("invalid value");
  }
};

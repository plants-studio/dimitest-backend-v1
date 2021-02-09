const getDuplicateKeys = (o: { [key: string]: number }): string[] => {
  const result: string[] = [];
  const value = Math.max(...Object.values(o));
  Object.entries(o).forEach((v) => {
    if (v[1] === value) {
      result.push(v[0]);
    }
  });
  return result;
};

export default getDuplicateKeys;

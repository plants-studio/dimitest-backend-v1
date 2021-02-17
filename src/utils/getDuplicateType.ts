const getDuplicateType = (score: { [key: string]: number }): string[] => {
  const result: string[] = [];
  const value = Math.max(...Object.values(score));
  Object.entries(score).forEach((v) => {
    if (v[1] === value) {
      result.push(v[0]);
    }
  });
  return result;
};

export default getDuplicateType;

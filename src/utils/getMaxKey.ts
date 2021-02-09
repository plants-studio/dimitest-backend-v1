const getMaxKey = (o: { [key: string]: number }): string => {
  let result: string = '';
  const value = Math.max(...Object.values(o));
  Object.entries(o).forEach((v) => {
    if (v[1] === value) {
      [result] = v;
    }
  });
  return result;
};

export default getMaxKey;

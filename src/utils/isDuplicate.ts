const isDuplicate = (o: { [key: string]: number }): boolean => {
  const value = Object.values(o);
  const max = Math.max(...value);
  let count = 0;
  value.forEach((v) => {
    if (v === max) {
      count += 1;
    }
  });
  if (count > 1) {
    return true;
  }
  return false;
};

export default isDuplicate;

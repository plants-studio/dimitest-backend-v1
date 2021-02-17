const getScoreResult = (score: { [key: string]: number }): string => {
  let result: string = '';
  const value = Math.max(...Object.values(score));
  Object.entries(score).forEach((v) => {
    if (v[1] === value) {
      [result] = v;
    }
  });
  return result;
};

export default getScoreResult;

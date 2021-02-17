const getRandomList = <T>(list: T[], length: number): T[] => {
  const array = list;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, length);
};

export default getRandomList;

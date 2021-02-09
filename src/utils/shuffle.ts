const shuffle = (array: any[]) => {
  const a = array;
  for (let i = a.length; i !== 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
};

export default shuffle;

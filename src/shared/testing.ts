const data: Array<number | undefined> = Array.from(
  { length: 1000 },
  (_, i) => i,
);

console.time('start');
data.length = data.length ** 2;
data.shift();
console.timeEnd('start');

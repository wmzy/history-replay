import Reader from './read-line-reverse';

export default async function tailN(filename, n = 10) {
  const reader = new Reader(filename);
  await reader.open();
  const lines = await reader.readLines(n);
  await reader.close();
  return lines;
}

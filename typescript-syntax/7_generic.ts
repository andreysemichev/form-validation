const arrNum: Array<number> = [1, 2, 3, 4, 5];
const arrStr: Array<string> = ["Hello", "World"];

function reverse<T>(arr: T[]): T[] {
  return arr.reverse();
}

// reverse(arrNum);
// reverse(arrStr);
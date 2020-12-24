const isFetching: boolean = true;

const int: number = 20;
const float: number = 4.2;
const num: number = 3e10;

const message: string = "this is a string";

const numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const numArr2: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const contact: [string, number] = ["String", 123];

let variable: any = 10;
variable = "string";

// Функция, которая возвращает void
function calculate(a: number, b: number): void {
  console.log(a + b);
}

// Функция, которая ничего не вернет
function throwError(msg: string): never {
  throw new Error(msg);
}

// Функция, которая ничего не вернет
function infinite(): never {
  while(true) {
    //...
  }
}

// Свой тип данных
type Login = string;
const login: Login = "admin";

// Свой тип данных
type ID = string | number;
const id: ID = 123;
const id2: ID = "123";

// Свой тип данных
type SomeType = string | null | undefined;
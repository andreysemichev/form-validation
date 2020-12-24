// Интерфейс
interface Rect {
  readonly id: string,
  color?: string,
  size: {
    width: number,
    height: number
  }
}

const rect: Rect = {
  id: "123",
  size: {
    width: 10,
    height: 20
  },
  color: "#fff"
};

const rect2 = {} as Rect;

// Расширение интерфейса
interface ReactWithArea extends Rect {
  getArea: () => number,
}

const rect3: ReactWithArea = {
  id: "123",
  size: {
    width: 10,
    height: 20
  },
  getArea(): number {
    return this.size.width * this.size.height;
  }
};

// Реализация интерфейса в классе
interface IClock {
  time: Date,
  setTime(date: Date): void
}

class Clock implements IClock {
  time: Date = new Date();
  setTime(date: Date): void {
    this.time = date;
  }
}

// Случайный набор ключей, но с заданным типом
interface Styles {
  [key: string]: string
}

const css: Styles = {
  border: "1ps solid black",
  marginTop: "2px",
  borderRadius: "5px"
};
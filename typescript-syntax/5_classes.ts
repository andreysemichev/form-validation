class TypeScript {
  version: string;

  constructor(version: string) {
    this.version = version;
  }

  info(name: string) {
    return name;
  }
}

class Car {
  readonly model: string;
  readonly wheels: number = 4;

  constructor(theModel: string) {
    this.model = theModel; // Переписать readonly можно только в конструкторе
  }
}

// Модификаторы класса
class Animal {
  protected voice: string = "";
  public color: string = "black";

  private go() {
    console.log("Go");
  }
}

class Cat extends Animal {
  public setVoice(voice: string): void {
    this.voice = voice;
  }
}

// Абстрактные классы
abstract class Component {
  abstract render();
  abstract info(): string;
}

class AppComponent extends Component {
  render(): void {
    console.log("Render...");
  }

  info(): string {
    return "Info";
  }
}
interface Pokemon {
  readonly name: string;
  hp: number;
  a: number;
  b: number;
  s: number;
  arts: [string];
  attack: (index: number) => void;
}

class Pikachu implements Pokemon {
  readonly name = "pikachu";
  hp: number;
  a: number;
  b: number;
  s: number;
  arts: [string];

  constructor(hp: number, a: number, b: number, s: number, ...arts: [string]) {
    this.hp = hp;
    this.a = a;
    this.b = b;
    this.s = s;
    this.arts = arts;
  }

  attack = (index: number): void => {
    console.log(`${this.name}, ${this.arts[index]}!`);
  };
}

const pika = new Pikachu(100, 120, 80, 150, "10万ボルト");
pika.attack(0);

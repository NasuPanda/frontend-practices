class Bird {
  constructor(name) {
    this.name = name;
  }

  chirp = () => {
    console.log(`${this.name}が鳴きました`);
  };

  static explain = (name) => {
    console.log(`${name}は翼があって卵を生みます`);
  };
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly = (meter) => {
    console.log(`${this.name}が${meter}m 飛びました`);
  };
}

const penguin = new Bird("ペンギン");
penguin.chirp();

Bird.explain("カラス");

const hawk = new FlyableBird("タカ");
hawk.fly(10000);

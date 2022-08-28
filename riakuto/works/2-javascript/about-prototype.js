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

console.log(new Array(1, 2, 3));
console.log(typeof Array); //function => コンストラクタ関数

console.log(new String("JavaScript"));
console.log(typeof String); //function => コンストラクタ関数

console.log(typeof Bird); // function

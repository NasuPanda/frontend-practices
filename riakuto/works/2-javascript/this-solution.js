class Person {
  constructor(name) {
    this.name = name;
  }

  greet1() {
    const doIt = function () {
      console.log(`Hi, ${this.name}`);
    };
    const bindedDoIt = doIt.bind(this);
    bindedDoIt(); // bind で this を束縛
  }

  greet2() {
    const doIt = function () {
      console.log(`Hi, ${this.name}`);
    };
    doIt.call(this); // this を指定
  }

  greet3() {
    const _this = this; // 変数 _this に値を移す

    const doIt = function () {
      console.log(`Hi, ${_this.name}`);
    };
    doIt();
  }

  greet4() {
    const doIt = () => {
      console.log(`Hi, ${this.name}`);
    }; // アロー関数で定義
    doIt();
  }

  // メソッド自体アロー関数で定義
  greet5 = () => {
    const doIt = () => {
      console.log(`Hi, ${this.name}`);
    };
    doIt();
  };
}

const creamy = new Person("Alice");
creamy.greet1(); //Hi, Alice
creamy.greet2(); //Hi, Alice
creamy.greet3(); //Hi, Alice
creamy.greet4(); //Hi, Alice
creamy.greet5(); //Hi, Alice

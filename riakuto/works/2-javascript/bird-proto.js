// 関数としてBirdクラスを宣言
function Bird(name) {
  this.name = name;
  this.chirp = function () {
    console.log(`${this.name}が鳴きました`);
  };
  return this;
}

// 拡張してみる
Bird.explain = function (name) {
  console.log(`${name}は卵を生むかもしれません`);
};

// 継承してみる
function FlyableBird(name) {
  Bird.call(this, name);
  this.fly = function () {
    console.log(`${this.name}がとんだ`);
  };

  return this;
}

// 動作確認
const penguin = new Bird("ペンギン");
penguin.chirp();

Bird.explain("カラス");

const hawk = new FlyableBird("タカ");
hawk.fly();

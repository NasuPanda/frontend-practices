{
  const str = `{ "id": 1, "username": "patty" }`;
  const user = JSON.parse(str);
  // コンパイルが通ってしまうが、 user.address.zipCodeは存在しないのでタイプエラーを吐く。
  console.log(user.id, user.address.zipCode);
}

{
  const str = `{"id": 1, "username": "john_doe"}`;
  const user: unknown = JSON.parse(str);
  // console.log(user.id, user.address.zipcode); // => アクセスされるプロパティの型を特定しなければ動作しない
}

{
  const greet = (friend: 'Serval' | 'Caracal' | 'Cheetah') => { switch (friend) {
    case 'Serval':
      return `Hello, ${friend}!`;
    case 'Caracal':
      return `Hi, ${friend}!`;
    case 'Cheetah':
      return `Hiya, ${friend}!`;
    default: {
      const check: never = friend;
      }
    }
  };
  console.log(greet('Serval')); // Hello, Serval!
}

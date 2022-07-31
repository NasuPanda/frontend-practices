const override = <T, U extends T>(obj1: T, obj2: U): T & U => ({
  ...obj1,
  ...obj2,
})

override({a: 1}, {a: 24, b: 5}); // {a: 24, b: 5}
// override({a: 2}, {x: 53}) // error

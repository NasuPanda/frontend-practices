// 通常のenum
{
  enum Pet { Cat, Dog, Rabbit }
  console.log(Pet.Cat, Pet.Dog, Pet.Rabbit)
}

// 文字列enum
{
  enum Pet {
    Cat = 'Cat',
    Dog = 'Dog',
    Rabbit = 'Rabbit',
  }
  let Tom: Pet = Pet.Cat;
  // Tom = 'Hamster'; // => Error
  // Tom = 'Dog';     // => Error(文字列DogはPet.Dogと同一ではない)
}

// リテラル型
{
  let Tom: 'Cat' = 'Cat';
  // Tom = 'Dog' // => Error

  let Mary: 'Cat' | 'Dog' | 'Rabbit' = 'Cat';
  Mary = 'Rabbit';
  // Mary = 'Parrot'; // => Error
}

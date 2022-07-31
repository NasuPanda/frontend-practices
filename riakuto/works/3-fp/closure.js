const counter = () => {
  let count = 0;

  const increment = () => {
    return count += 1;
  };

  return increment;
};

// あるいはこう
// const counter = (count = 0) => (adds = 1) => count += adds;
// const increment = counter()

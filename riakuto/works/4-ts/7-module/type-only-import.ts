import { Resident } from "./type-only-export";

// const resident = new Resident(); // Error(オブジェクトは import していないため)
const patty: Resident = {
  name: 'Patty rabbit', age: 5, species: 'rabbit',
};

console.log(patty);

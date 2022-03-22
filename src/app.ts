const userName = 'Max'; // immutable

let age = 30; // variables are mutable
age = 29;

// let includes block scopes i.e., better scoping than its predecessor var
// which only had function and global scope

// arrow functions in modern javascript
const add = (a: number, b: number) => {
  return a + b;
};

console.log(add(2,5));

// SPREAD operator "..."
// can be used wherever you need a comma separate list of values
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
// const activeHobbies = ['Hiking', ...hobbies] // this is also valid

const person = {
  firstName: 'Max',
  ageInYears: 30
};

// using spread operator on objects i.e., key-value pairs
// this produces a "deep" or true copy
const copiedPerson = { ...person };

// REST Parameters
// can use list of values thru spread operator
// supplied as a list of numbers, that is merged into an array of numbers
// note this can also work with tuples
const addRested = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = addRested(5, 10, 2, 3.7);
console.log(addedNumbers);

// ARRAY & OBJECT Destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

// destructuring objects requires usage of same field names
// or can be overid by using ": <new-alias>"
const { firstName, ageInYears } = person;
console.log(firstName, ageInYears, person);
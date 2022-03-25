// Example Generics
// const names: Array<string> = ['Max', 'Manuel'];
// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!');
//   }, 2000);
// })

// promise.then(data => {
//   data.split(' ');
// })

// Creating Generic Functions with constraints
// can refer to objects, strings, union types, interfaces
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB); // returns intersection T & U
}

// without generics, cannot access properties
const mergedObj = merge({ name: 'Andrei', hobbies: ['Sports'] }, { age: 34 });
console.log(mergedObj);
console.log(mergedObj.name);

// another generic
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1  element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'));

// Using the `keyof` constraint with Generics
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T, 
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ name: 'Max' }, 'name'));
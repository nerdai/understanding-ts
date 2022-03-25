// adding return types of functions
// note: not necessary to do this as TS can infer the type
function add(n1: number, n2: number): number {
  return n1 + n2;
}

// void return type, i.e., TS not expecting anything ot be returned
function printResult(num: number): void {
  console.log("Result: " + num);
}

// adding a function, call-back to a function
// specifying void in call-back just means TS will ignore the value
// that is returned from the call-back
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;
console.log(combineValues(8, 8));

// using the callback function
addAndHandle(10, 20, (result) => {
   console.log(result);
})
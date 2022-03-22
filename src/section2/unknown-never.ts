// unknown type
let userInput: unknown
let userName: string;

userInput = 5;
userInput = 'Maxy';
// need this extra type check if using `unknown` type.
// with `any` you don't need this
if (typeof userInput === 'string') {
  userName = userInput;
}

// never type
// the function below returns a never
// throw crashes the program or this part of the script
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('An error occurred!', 500);
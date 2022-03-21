// unknown type
var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// need this extra type check if using `unknown` type.
// with `any` you don't need this
if (typeof userInput === 'string') {
    userName = userInput;
}
// never type
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An error occurred!', 500);

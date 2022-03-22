"use strict";
const button = document.querySelector('button');
function clickHandler(message) {
    console.log('Clicked ' + message);
}
// can also us "optional" unwrapping with ! instead if you know button
// does indeed exist
if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}

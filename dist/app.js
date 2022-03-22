"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
// can implement more interfaces
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log('Hi');
        }
    }
}
let user1; // interfaces like can be used as a type
user1 = new Person();
// user1.name = 'Manu'; // this will result in an error because this is readonly
user1.greet('Hi there - I am');

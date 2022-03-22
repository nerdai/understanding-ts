// interfaces are like custom types, similar to structs & traits in Rust
// this is different from custom types
// interfaces can only be used to describe the structure of an object
// interfaces cannot hold values or implementations
// interface can be used in a class as a contract
// abstract classes unlike interfaces can mix implentation details with
// abstract methods and properties
// interfaces are used only in TS so in development; this is not known to JS
interface Named {
  readonly name?: string;
  outputName?: string; // optional properties 
}

// interfaces can also use inheritance, but unlike classes can extend with 
// mulitple interfaces
interface Greetable extends Named {
  greet(phrase: string): void;
}

// as an exception, you can create functions as interfaces, since functions
// are implemented as objects
// however using custom types as in previous section is a bit more common
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}

// can implement more interfaces
class Person implements Greetable {
  name?: string; // don't need to put read only here
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi')
    }
    
  }
}
let user1: Greetable; // interfaces like can be used as a type
user1 = new Person();
// user1.name = 'Manu'; // this will result in an error because this is readonly
user1.greet('Hi there - I am');
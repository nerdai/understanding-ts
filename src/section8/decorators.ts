// Decorators are functions for meta programming
// functions applied to functions used by devs, not really exposed to users
// of the web page

// decorator over class (requires one parameter)
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// decorator factory
function Logger(logString: string) {
  // inner, return decoartor
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// original class decorator that doesn't return anything
// this decorator factory needs one parameter, which is the target,
// that is the constructor
function OriginalWithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    console.log("rendering template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// decorators can also be made to return something, and what they return
// depends on where they're being applied
// this decorator returns a new constructor to replace the original one
// used by the class that is being decorated
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstuctor: T
  ) {
    console.log("rendering template");
    return class extends originalConstuctor {
      // class is syntactic sugar for constructor
      constructor(...args: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstuctor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON') // decorators execute when class is
// defined, not when instantiated
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app") // decorators operate bottom up
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// more decorators
// arguments that decorators get depend on where they're being used

// decorator to property
// note target is of type Prototype if belongs to instance and constructor() if
// is a static
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

// decorator to accessors
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// decorators to methods
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// decorators to parameters
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, private _price: number) {
    this.title = t;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Note: decorators don't execute when a class is instantiated
// These get execute when the decorated class is defined
// The below doesn't add more logs to the console
const p1 = new Product("Book 1", 19);
const p2 = new Product("Book 2", 29);

// Autobind Decorator
function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  console.log('Autobind Decorator!')
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // step in and do some extra work before executing the function
      const boundFn = originalMethod.bind(this); // this refers to triggering 
                                                 // the getter method i.e., 
                                                 // original object
      return boundFn;
    } 
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);


/* ----------------------------------------------------------------------------- 
Decorators for Validation
------------------------------------------------------------------------------*/
interface ValidatorConfig {
  [validatableConstructor: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required'
    ] // square brackets here is syntactic sugar
      // https://stackoverflow.com/questions/32515598/square-brackets-javascript-object-key
  };                         
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive'
    ]
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    // nothing to validate
    return true;
  }
  console.log(objValidatorConfig);
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break; // terminates the switch statement
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again.');
    return;
  }
  console.log(createdCourse)
});
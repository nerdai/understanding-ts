// Intersection types
// the effect can be implemented via interfaces when defining type objects
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// interfaces won't work for this tho
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guards
// type guard using `typeof`

function add(a: number, b: number): number // function overloads
function add(a: string, b: string): string
function add(a: number, b: string): string
function add(a: string, b: number): string
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

// type guard for classes using instanceof
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo ..." + amount);
  }
}

type Vechile = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vechile) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
// need a common property in each of these
// can be used with objects, types, and interfaces
interface Bird {
  type: "bird"; // literal assignment
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// can't use instanceof with interfaces
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 20 });

// Type Casting
// const userInputElement = <HTMLInputElement>document.getElementById(
//  'user-input'
// )!; // option1 but this will class with react syntax
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi There!";

// Index Properties
interface ErrorContainer {
  // index types
  // don't know the property name, just know it's a type string
  // also know that it will hold a value that is a string type
  [prop: string]: string;
  // id: string; // can add predefined properties if you know them in advance 
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a capital character!'
};

// Function Overloads
// functions with same names with different signatures see above for example
// on overloading add()
const result = add('Max ', 'Schwarz'); // without overload this would be
                                      // of type Combinable
console.log(result.split(' '))

// Optional Chaining
// objects can't have optional properties
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' }
};

console.log(fetchedUserData?.job?.title);

// Nullish Coalescing ??
// Null or Undefined
// NOT '' or 0, etc.
const userInput = undefined;

const storedData = userInput ?? 'default';

console.log(storedData);
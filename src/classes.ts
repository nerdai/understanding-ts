abstract class Department {
  // private name: string;
  protected employees: string[] = []; // note public is default modifier
                                    // but is needed when using shortcut
                                    // for constructor
                                    // protected like private but can be used
                                    // in classes that inherit this one
  // constructor method
  // constructor(n: string) {
  //   this.name = n;
  // }

  // shorthand notation to remove duplication of declaration of fields
  // and the constructor
  constructor(
    protected readonly id: string,
    public name: string,
  ) {} 

  // static methods
  // useful for building utility functions that don't require one to 
  // instantiate a class into an object in order to use
  static createEmployee(name: String) {
    return { name: name };
  }

  // abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// Inheritance
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT'); // super() must be called first before anything else
  }

  describe(): void {
    console.log(`Department (${this.id}): ${this.name}`)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // for singleton pattern

  describe(): void {
    console.log(`Department (${this.id}): ${this.name}`)
  }

  // getter for this private property
  // these functions have to return something
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.")
  }

  // setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass value.")
    }
    this.addReport(value);
  }

  // setting private modifier to constructor 
  // for implementing the singleton pattern
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance; // this in static method gives access to the class
                            // so this can be used or explicit name of class
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  // overriding super's implementation of addEmployee
  addEmployee(employee: string): void {
    if (employee === 'Max') {
      return;
    }
    this.employees.push(employee);  // note: needed this attribute to be
                                    // protected instead of private 
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}
// using static methods
const employee1 = Department.createEmployee('Max');
console.log(employee1);
 
const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Andrei');

console.log(it);
it.describe();
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = "Year End Report"; // using a setter
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport); // getters get accessed as a property

accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployeeInformation();
accounting.printReports();

// note abstract classes cannot be instantiated
// const = new Department('d1', 'Math') // this will not compile
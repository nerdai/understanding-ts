class Department {
  // private name: string;
  private employees: string[] = []; // note public is default modifier

  // constructor method
  // constructor(n: string) {
  //   this.name = n;
  // }

  // shorthand notation to remove duplication of declaration of fields
  // and the constructor
  constructor(
    private readonly id: string,
    public name: string,
  ) {}

  // other methods
  describe(this: Department) {
    // note "this" keyword is not necessary
    // but can be used to enforce more safe implementation
    // only objects of Department class can call this method as a result
    console.log(`Department (${this.id}): ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('d1', 'Accounting');

accounting.addEmployee('Max');
accounting.addEmployee('Andrei');

console.log(accounting);
accounting.describe();
accounting.printEmployeeInformation();
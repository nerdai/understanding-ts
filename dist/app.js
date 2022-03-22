"use strict";
class Department {
    // constructor method
    // constructor(n: string) {
    //   this.name = n;
    // }
    // shorthand notation to remove duplication of declaration of fields
    // and the constructor
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private name: string;
        this.employees = []; // note public is default modifier
    }
    // other methods
    describe() {
        // note "this" keyword is not necessary
        // but can be used to enforce more safe implementation
        // only objects of Department class can call this method as a result
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
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

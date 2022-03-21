// JS object type annotation below
// is not as optimal as letting TS do type inference
// const person: {
//    name: string;
//    age: number;
//}

// however, there at times where you need to use
// explicit type assignment, i.e., when TS can't infer
// the difference for a tuple or an array
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'Maximilian',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'], // Array
//     role: [2, 'author']
// };

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'], // Array
    role: Role.ADMIN
};

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
    console.log('is admin');
}
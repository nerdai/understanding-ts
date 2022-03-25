// import _ from 'lodash'; // lodash is a JS 3rd party library
//                         // we needed the translation via d.ts files
//                         // npm install --save @types/lodash

// console.log(_.shuffle([1,2,3]));
import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.models";

// assume this was JSON data retrieved from a backend
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

// manual transform these JSON data to conform to Product model
const loadedProducts = products.map(prod => {
  return new Product(prod.title, prod.price);
});

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// instead we can use 3rd party library, class-transformer
const loadedProductsAuto = plainToInstance(Product, products);

for (const prod of loadedProductsAuto) {
  console.log(prod.getInformation());
}

// using class-validators
const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
})
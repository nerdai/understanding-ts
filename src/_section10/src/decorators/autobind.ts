// Autobind Decorator
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
    },
  };
  return adjDescriptor;
}
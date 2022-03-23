// Generics => flexible, yet offering strong type support
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numStorage = new DataStorage<number>();
numStorage.addItem(1);
numStorage.addItem(2);
numStorage.removeItem(2);
console.log(numStorage.getItems());

// note we have to be careful with objects or non-primitives
// as these are referenced types
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'Max' });
// objStorage.addItem({ name: 'Manu' });
// objStorage.removeItem({ name: 'Manu' });
// console.log(objStorage.getItems());
//Create a stack class to implement stacks
class Stack { ///////////////////////// I MIGHT NOT NEED THIS
  constructor() {
    this.items = [];
    this.count = 0;
  }
  push(element) {
    this.items.push(element);
    this.count += 1;
  }
  pop() {
    if (this.count == 0) {
      return "Nothing in the stack";
    } else {
      this.count -= 1;
      return this.items.pop();
    }
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  getSize() {
    return this.count;
  }

} //end of Stack class

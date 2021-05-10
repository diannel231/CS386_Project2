class Queue{
  constructor(){
      this.items = [];
  }
  // Functions to be implemented
  // enqueue(item)- add to the end
  enqueue(element){
     this.items.push(element);
   }

  // dequeue() - removes from the front
  dequeue(){
    if(this.isEmpty()){
      return "Underflow";
    }
    return this.items.shift();
  }

   // front() - return the front element
  front(){
    if(this.isEmpty()){
        return "No elements in Queue";
    }
    return this.items[0];
  }

  // isEmpty() - returns if empty or not
  isEmpty(){
    return this.items.length == 0;
  }
}

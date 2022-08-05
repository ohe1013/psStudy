let input = require('fs').readFileSync('example.txt').toString().split('\r\n'); /// /dev/stdin
class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    push(item) {
        const node = new Node(item);
        if (!this.tail) {
            this.tail = node;
        } else {
            this.head.next = node;
        }
        this.head = node;
        this.size +=1;
    }
    pop() {
        if(!this.getSize()){
            return -1;
        } else {
            const popData = this.tail.data;
            this.tail = this.tail.next;
            this.size -=1;
            return popData;
        }
    }

    getSize() {
        return this.size;
    }
    front() {
        return this.getSize() ? this.tail.data : -1;
    }
    back () {
        return this.getSize() ? this.head.data : -1;
    }
    empty() {
        return this.getSize() ? 0:1;
    }
}
let q = new Queue();
let result = [];
for (let i = 1; i < input.length; i++) {
    let operation = input[i].split(' ')[0];
    switch (operation) {
        case 'push':
            q.push(input[i].split(' ')[1]);
            break;
        case 'pop':
            result.push(q.pop());
            break;
        case 'size':
            result.push(q.getSize());
            break;
        case 'empty':
            result.push(q.empty());
            break;
        case 'front':
            result.push(q.front());
            break;
        case 'back':
            result.push(q.back());
            break;
    }
}
console.log(result.join('\n'));
// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const splitType = process.platform === "linux" ? "\n" : "\r\n";
// let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let inputs;
let list = [];
rl.on("line", function (line) {
  inputs.push(line);
  rl.close();
}).on("close", function () {
  const log = console.log;
  const input = inputs;
  class Heap {
    constructor(flag) {
      this.heap = [];
      this.flag = flag;
    }

    compare(a, b) {
      return this.flag ? a > b : a < b;
    }

    isEmpty() {
      if (this.heap.length) return false;
      return true;
    }
    swap(a, b) {
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    push(val) {
      this.heap.push(val);

      let curIdx = this.heap.length - 1;
      while (curIdx > 0) {
        let parentIdx = ((curIdx - 1) / 2) >> 0;
        if (this.compare(this.heap[curIdx], this.heap[parentIdx])) {
          this.swap(parentIdx, curIdx);
          curIdx = parentIdx;
        } else {
          break;
        }
      }
    }
    pop() {
      let value;
      if (this.heap.length === 1) {
        return this.heap.pop();
      }
      value = this.heap[0];
      this.heap[0] = this.heap.pop();
      let curIdx = 0;
      while (true) {
        let newIdx = curIdx;
        let leftChildIdx = curIdx * 2 + 1;
        let rightChildIdx = curIdx * 2 + 2;
        if (
          leftChildIdx < this.heap.length &&
          this.compare(this.heap[leftChildIdx], this.heap[newIdx])
        ) {
          newIdx = leftChildIdx;
        }
        if (
          rightChildIdx < this.heap.length &&
          this.compare(this.heap[rightChildIdx], this.heap[newIdx])
        ) {
          newIdx = rightChildIdx;
        }
        if (newIdx !== curIdx) {
          this.swap(newIdx, curIdx);
          curIdx = newIdx;
        } else {
          break;
        }
      }
      return value;
    }
  }

  class DoublePriorityQueue {
    constructor() {
      this.maxHeap = new Heap(true);
      this.minHeap = new Heap(false);
      this.valid = new Map();
    }

    push(val) {
      this.maxHeap.push(val);
      this.minHeap.push(val);
      this.valid.get(val)
        ? this.valid.set(val, this.valid.get(val) + 1)
        : this.valid.set(val, 1);
    }

    pop(flag) {
      const heap = flag === 1 ? this.maxHeap : this.minHeap;
      if (heap.isEmpty()) return null;
      while (!heap.isEmpty()) {
        const popped = heap.pop();

        // 이미 유효하지 않은 수이면 패쓰
        if (!this.valid.has(popped)) continue;

        if (this.valid.get(popped) === 1) this.valid.delete(popped);
        else this.valid.set(popped, this.valid.get(popped) - 1);
        return popped;
      }
    }
  }
  let answer = "";
  const main = () => {
    const times = +input.shift();
    let idx = 0;
    for (let i = 0; i < times; i++) {
      const dpQueue = new DoublePriorityQueue();
      const val = +input[idx];
      idx++;
      const start = idx;
      const end = val + start;
      for (let j = start; j < end; j++) {
        const [oper, val] = input[j].split(" ");
        if (oper === "I") {
          dpQueue.push(+val);
        } else {
          dpQueue.pop(+val);
        }
      }
      const max = dpQueue.pop(1);
      const min = dpQueue.pop(-1) || max;
      max ? (answer += `${max} ${min}\n`) : (answer += `EMPTY\n`);
      idx = end;
    }
  };
  main();
  log(answer);
});

keepgoing

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

class Heap {

    constructor() {
        this.heap = [];
    }

    swap(a, b) {
        [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
    }
    size() {
        return this.heap.length;
    }
    push(value) {

        this.heap.push(value);
        let idx = this.heap.length -1;
        let parent = Math.floor((idx - 1) /2);
        while (this.heap[parent] < value) {
            this.swap(parent, idx);
            idx = parent;
            parent = Math.floor((idx-1) / 2);
        }
    }
    pop() {
        const lastIdx = this.heap.length - 1;
        let idx = 0;
        this.swap(0, lastIdx);
        let value = this.heeap.pop();

        while(idx < lastIdx) {
            let leftChildIdx = idx*2 + 1;
            let rightChildIdx = idx*2 +2;
            
            if(leftChildIdx >= lastIdx) {
                break;
            } else if ( rightChildIdx >= lastIdx){
                if (this.heap[idx] < this.heap[leftChildIdx]){
                    this.swap(idx, leftChildIdx);
                    idx = leftChildIdx;
                } else {
                    break;
                }
            } else {
                if (this.)
            }
        }


    }


}
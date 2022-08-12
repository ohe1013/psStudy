const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
class Heap {

    constructor() {
        this.heap = [];
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    size() {
        return this.heap.length;
    }
    push(value, n) {

        this.heap.push(value);
        let idx = this.heap.length -1;
        let parent = Math.floor((idx - 1) /2);
        while (this.heap[parent] < value) {
            this.swap(parent, idx);
            idx = parent;
            parent = Math.floor((idx-1) / 2);
        }
    }
    shift() {
        this.heap.pop();
    }
    pop() {
        const lastIdx = this.heap.length - 1;
        let idx = 0;
        this.swap(0, lastIdx);
        let value = this.heap.pop();

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
                if(this.heap[leftChildIdx] > this.heap[idx] && this.heap[rightChildIdx] > this.heap[idx]) {
                    // 큰값이랑 스왑
                    if(this.heap[leftChildIdx] > this.heap[rightChildIdx]) {
                        this.swap(idx, leftChildIdx)
                        idx = leftChildIdx
                    } else {
                        this.swap(idx,rightChildIdx)
                        idx = rightChildIdx
                    }
                } else if(this.heap[leftChildIdx] > this.heap[idx]) {  // 왼쪽 자식만 루트보다 클 경우
                    this.swap(leftChildIdx, idx)
                    idx = leftChildIdx
                } else if(this.heap[rightChildIdx] > this.heap[idx]) { // 오른쪽 자식
                    this.swap(rightChildIdx, idx)
                    idx = rightChildIdx
                } else { // 둘다 작을경우 안바꿈
                    break
                }
            }
        }
        return value;
    }
    print() {
        console.log(this.heap)
    }
}

let a = new Heap();

let num = input.shift();

for(let i =0; i<num; i++) {
    input[i].split(' ').forEach((item) => {
        a.push(parseInt(item));
    })
}
for(let i =0; i<num-1; i++) {
    a.pop()
}

console.log(a.pop())
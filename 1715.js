const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
/**
 * 첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100,000) 이어서 N개의 줄에 걸쳐 숫자 카드 묶음의 각각의 크기가 주어진다.
 * 숫자 카드 묶음의 크기는 1,000보다 작거나 같은 양의 정수이다.
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }
    length() {
        return this.heap.length;
    }
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    push(value) {
        this.heap.push(value);
        let idx = this.heap.length - 1;
        let parentIdx = Math.floor((idx - 1) / 2);
        while (idx > 0 && this.heap[idx] < this.heap[parentIdx]) {
            this.swap(idx, parentIdx);
            idx = parentIdx;
            parentIdx = Math.floor((parentIdx - 1) / 2);
        }
    }
    pop() {
        if (this.heap.length <= 1) return this.heap.pop();
        const min = this.heap[0];
        let idx = 0;
        this.heap[idx] = this.heap.pop();
        while (true) {
            let leftIdx = idx * 2 + 1;
            let rightIdx = idx * 2 + 2;
            if (leftIdx >= this.heap.length) break;
            let nextIdx = idx;
            if (this.heap[nextIdx] > this.heap[leftIdx]) nextIdx = leftIdx;
            if (rightIdx < this.heap.length && this.heap[nextIdx] > this.heap[rightIdx])
                nextIdx = rightIdx;
            if (nextIdx === idx) break;
            this.swap(idx, nextIdx);
            idx = nextIdx;
        }
        return min;
    }
}

const [N, ...arr] = input.map(Number);
const minHeap = new MinHeap();
arr.forEach((item) => minHeap.push(item));
let answer = 0;
for (let i = 0; i < N - 1; i++) {
    const temp = minHeap.pop() + minHeap.pop();
    answer += temp;
    minHeap.push(temp);
}

console.log(answer);

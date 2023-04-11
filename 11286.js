const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    절댓값 1이 1 -1 순인데 -1,1 로 나온다
*/
const N = +input.shift();
const vals = input.map(Number);

class AbsHeap {
    constructor() {
        this.nodes = [null];
    }
    swap(idx1, idx2) {
        [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
    }
    getMin() {
        return this.nodes[1] ?? null;
    }
    size() {
        return this.nodes.length - 1;
    }

    heapPush(value) {
        this.nodes.push(value);
        let curIdx = this.nodes.length - 1;
        let parIdx = (curIdx / 2) >> 0;
        while (curIdx > 1 && Math.abs(this.nodes[parIdx]) > Math.abs(this.nodes[curIdx])) {
            this.swap(curIdx, parIdx);
            curIdx = parIdx;
            parIdx = (parIdx / 2) >> 0;
        }
        while (
            curIdx > 1 &&
            Math.abs(this.nodes[parIdx]) === Math.abs(this.nodes[curIdx]) &&
            this.nodes[parIdx] > this.nodes[curIdx]
        ) {
            this.swap(curIdx, parIdx);
            curIdx = parIdx;
            parIdx = (parIdx / 2) >> 0;
        }
    }
    heapPop() {
        let min = this.nodes[1];
        let tempIdx = this.nodes.findIndex((item) => item === -Math.abs(min));
        if (tempIdx != -1) {
            min = this.nodes[tempIdx];
            this.swap(1, tempIdx);
        }
        if (this.nodes.length <= 2) this.nodes = [null];
        else {
            this.nodes[1] = this.nodes.pop();
        }

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1;

        if (!this.nodes[leftIdx]) return min;
        if (!this.nodes[rightIdx]) {
            if (this.nodes[leftIdx] < this.nodes[curIdx]) {
                this.swap(leftIdx, curIdx);
            }
            return min;
        }
        while (
            Math.abs(this.nodes[leftIdx]) < Math.abs(this.nodes[curIdx]) ||
            Math.abs(this.nodes[rightIdx]) < Math.abs(this.nodes[curIdx])
        ) {
            const minIdx =
                Math.abs(this.nodes[leftIdx]) > Math.abs(this.nodes[rightIdx]) ? rightIdx : leftIdx;
            this.swap(minIdx, curIdx);
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }
        return min;
    }
}
const heap = new AbsHeap();

for (let i of vals) {
    if (i !== 0) {
        heap.heapPush(i);
    } else {
        if (heap.size() === 1) {
            console.log(0);
        } else {
            console.log(heap.heapPop());
        }
    }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);


class Heap {
    constructor () {
        this.items = [];
    }
    swap (idx1, idx2) {
        [this.items[idx1], this.items[idx2] ] = [this.items[idx2], this.items[idx1]];
    }
    findParentIdx(idx) {
        return Math.floor((idx-1) /2);
    }
    findLeftChildIdx(idx) {
        return idx * 2 + 1;
    }
    findRightChildIdx(idx) {
        return idx *2 + 2;
    }

    findParent(idx) {
        return this.items[this.findParentIdx(idx)];
    }
    findLeftChild(idx) {
        return this.items[this.findLeftChildIdx(idx)];
    }
    findRightChild(idx) {
        return this.items[this.findRightChildIdx(idx)];
    }
    peek() {
        return this.items[0];
    }
    size () {
        return this.items.length;
    }

}
class MinHeap extends Heap {
    //값 추가시에 minheap 유지
    bubbleUp () {
        let index = this.items.length - 1; // 마지막으로 추가된 원소
        while ( this.findParent(index) && this.findParent(index)[1] > this.items[index][1] ) {
            this.swap(index, this.findParentIdx(index));
            index = this.findParentIdx(index);
        }
    }
    bubbleDown() {
        let index = 0;
        while((this.findLeftChild(index) &&this.findLeftChild(index)[1] < this.items[index][1] ) ||
            (this.findRightChild(index) && this.findRightChild(index)[1] < this.items[index][1])
        ) {
            let smallIndex = this.findLeftChildIdx(index);

            if ( this.findRightChild(index) &&
            this.findRightChild(index)[1] < this.itmes[smallIndex][1]){
                smallIndex = this.findRightChild(index);
            }
            this.swap(index,smallIndex);
            index = smallIndex
        }
    }
    add (value) {
        this.items.push(value);
        this.bubbleUp();
    }
    poll() {
        if(this.items.length ===1) {
            return this.items.pop();
        }
        const value = this.items[0];
        this.items[0] = this.items.pop();
        this.bubbleDown();

        return value;
    }
}

const dijkstra = (start, adjList, V) => {
    const minHeap = new MinHeap();
    const dist = Array(V+1).fill(Infinity);
    dist[start] = 0;
    minHeap.add([start,0]);

    while(minHeap.size()) {
        const [vertex,cost] = minHeap.poll();
        
        if(!adjList[vertex]) continue;
        if(dist[vertex] < cost) continue;

        for (let i = 0; i < adjList[vertex].length; i++) {
            const [nextVertex, nextCost] = adjList[vertex][i];
            if (dist[nextVertex] > cost+nextCost){
                dist[nextVertex] = cost + nextCost;
                minHeap.add([nextVertex, dist[nextVertex]]);
            }
        }
    }
    return dist;
}

const [V,E] = input[0].split(' ').map(Number);
const adjList = {};
for ( let i =1; i<=V; i++) {
    adjList[i] =[];
}
for (let j=1; j<=E; j++) {
    const [from, to ,price] = input[j].split(' ').map(Number);
    adjList[from].push([to,price]);
    adjList[to].push([from,price]);
}
if (E === 0 ) return console.log(-1);
const [A,B] = input[E+1].split(' ').map(Number);
const a = dijkstra(1,adjList,V);
const b = dijkstra(A,adjList,V);
const c = dijkstra(B,adjList,V);
let sum1 = a[A] + b[B] + c[V];
let sum2 = a[B] + c[A] + b[V];
const answer = sum1< sum2 ? sum1 : sum2;
if (answer === Infinity) console.log(-1)
else {
    console.log(answer)
}


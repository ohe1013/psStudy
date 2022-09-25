const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, S] = input.shift().split(" ").map(Number);

const graph = new Array(N + 1).fill(0).map(() => []);
const visit = new Array(N + 1).fill(false);

for (let i = 0; i < S; i++) {
  let [a, b, c] = input.shift().split(" ").map(Number);
  graph[a].push({ to: b, dist: c });
  graph[b].push({ to: a, dist: c });
}
//두 점을 가지고 순서만 바꿔서 해보고 큰걸로 하면되자나?

const [prev, next] = input.shift().split(" ").map(Number);
//prev를 먼저하고

// 1번 노드와 각 노드까지 최단 경로를 저장하는 배열 생성
let dist = Array(graph.length).fill(Infinity);

// 큐 생성 및 1번 노드에 대한 정보 저장
let queue = [{ to: 1, dist: 0 }];

let sum = 0;

// 1번 노드의 거리는 0 으로 설정
dist[1] = 0;

// 큐가 빌 때까지 반복
while (queue.length) {
    // 큐에서 방문할 노드 꺼내기
    const { to } = queue.pop();
    
    // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
    // 기존에 저장된 값과 비교해서 갱신
    graph[to].forEach((next) => {
        const acc = dist[to] + next.dist;
        if (dist[next.to] > acc) {
            dist[next.to] = acc;
            // 최단 경로가 되는 노드는 큐에 추가
            queue.push(next);
        }
    });
}

sum += dist[prev];

dist = Array(graph.length).fill(Infinity);
queue = [{ to : prev, dist: 0}]
dist[prev] = 0
// 1번 노드의 거리는 0 으로 설정

// 큐가 빌 때까지 반복
while (queue.length) {
  // 큐에서 방문할 노드 꺼내기
  const { to } = queue.pop();

  // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
  // 기존에 저장된 값과 비교해서 갱신
  graph[to].forEach((next) => {
    const acc = dist[to] + next.dist;
    if (dist[next.to] > acc) {
      dist[next.to] = acc;
      // 최단 경로가 되는 노드는 큐에 추가
      queue.push(next);
    }
  });
}

sum += dist[next];

dist = Array(graph.length).fill(Infinity);
queue = [{ to : next, dist: 0}]
dist[next] = 0
// 1번 노드의 거리는 0 으로 설정

// 큐가 빌 때까지 반복
while (queue.length) {
  // 큐에서 방문할 노드 꺼내기
  const { to } = queue.pop();

  // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
  // 기존에 저장된 값과 비교해서 갱신
  graph[to].forEach((next) => {
    const acc = dist[to] + next.dist;
    if (dist[next.to] > acc) {
      dist[next.to] = acc;
      // 최단 경로가 되는 노드는 큐에 추가
      queue.push(next);
    }
  });
}
sum += dist[N];
let min = sum;
sum = 0;
// 1번 노드와 각 노드까지 최단 경로를 저장하는 배열 생성
dist = Array(graph.length).fill(Infinity);

// 큐 생성 및 1번 노드에 대한 정보 저장
queue = [{ to: 1, dist: 0 }];

sum = 0;

// 1번 노드의 거리는 0 으로 설정
dist[1] = 0;

// 큐가 빌 때까지 반복
while (queue.length) {
    // 큐에서 방문할 노드 꺼내기
    const { to } = queue.pop();
    
    // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
    // 기존에 저장된 값과 비교해서 갱신
    graph[to].forEach((next) => {
        const acc = dist[to] + next.dist;
        if (dist[next.to] > acc) {
            dist[next.to] = acc;
            // 최단 경로가 되는 노드는 큐에 추가
            queue.push(next);
        }
    });
}

sum += dist[next];

dist = Array(graph.length).fill(Infinity);
queue = [{ to : next, dist: 0}]
dist[next] = 0
// 1번 노드의 거리는 0 으로 설정

// 큐가 빌 때까지 반복
while (queue.length) {
  // 큐에서 방문할 노드 꺼내기
  const { to } = queue.pop();

  // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
  // 기존에 저장된 값과 비교해서 갱신
  graph[to].forEach((next) => {
    const acc = dist[to] + next.dist;
    if (dist[next.to] > acc) {
      dist[next.to] = acc;
      // 최단 경로가 되는 노드는 큐에 추가
      queue.push(next);
    }
  });
}

sum += dist[prev];

dist = Array(graph.length).fill(Infinity);
queue = [{ to : prev, dist: 0}]
dist[prev] = 0
// 1번 노드의 거리는 0 으로 설정

// 큐가 빌 때까지 반복
while (queue.length) {
  // 큐에서 방문할 노드 꺼내기
  const { to } = queue.pop();

  // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
  // 기존에 저장된 값과 비교해서 갱신
  graph[to].forEach((next) => {
    const acc = dist[to] + next.dist;
    if (dist[next.to] > acc) {
      dist[next.to] = acc;
      // 최단 경로가 되는 노드는 큐에 추가
      queue.push(next);
    }
  });
}
sum += dist[N];

if (min > sum) min = sum;
console.log(min)

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


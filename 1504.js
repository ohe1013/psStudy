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
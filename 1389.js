const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N,M] = input.shift().split(' ').map(Number);

const graph = new Array(N ).fill(0).map(()=> new Array(N).fill(Infinity))

input.forEach((rel) => {
    const [a,b] = rel.split(' ').map(Number);
    graph[a-1][b-1] = 1
    graph[b-1][a-1] = 1
})

for(let k=0; k<N;k++){
    for(let i=0; i<N; i++) {
        for(let j=0; j<N; j++){
            if(graph[i][j] > graph[i][k] + graph[k][j]){
            graph[i][j] = graph[i][k] + graph[k][j]
            }
        }
    }
}
let min = 99999;
let idx = 999;
for(let i =0; i<N; i++) {
    let temp = (graph[i].reduce((cur,prev) => cur+prev));
    idx = min <= temp ? idx: i; //min이 현재값보다 작을때는 idx = idx temp 가 더 크면 idx = i 를 넣는데, 같을때는 ? 값이 같으면 이전값으로 계속가야된다. 근데 값이 같을때는 false가 되면서 temp로 바뀐다.
    min = min <= temp ? min: temp;
}

console.log(idx + 1)
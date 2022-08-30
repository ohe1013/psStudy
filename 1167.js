const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

let n = parseInt(input.shift());//vertex 갯수

let tree = Array.from(Array(n + 1), ()=> new Array());

input.forEach((items) => {
    let _ = items.split(' ');
    let i = _.shift();
    _.pop();
    let j = 0;
    for(let k = 0; k< _.length; k++){
        if (k%2 === 0) j= parseInt(_[k]);
        else tree[i].push( [j,parseInt(_[k])] );
    }
})

let visited = new Array(n+1).fill(false);
let dist = 0;
let idx = 0;

const dfs = (start) => {
    let stack = [[start,0]];
    while(stack.length) {
        let [loc, locCost] = stack.pop();
        if(visited[loc]) continue;
        visited[loc] = true;
        for(t of tree[loc]){
            let [to, cost] = t;
            if(!visited[to]){
                stack.push([to,cost+locCost]);
            }
        }
        if( dist < locCost){
            dist = locCost; 
            idx = loc;
        }
    }
}
dfs(1);
visited = new Array(n+1).fill(false);
dfs(idx)
console.log(dist``)
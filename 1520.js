const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

let [r,c] = input.shift().split(' ').map(Number);

const dp = [...Array(r)].map(() => Array(c).fill(-1));
dp[r-1][c-1] = 1;
for(let i=0; i<r;i++){
    input[i] = input[i].split(' ').map(Number);
}
let dx = [-1,0,1,0];
let dy = [0,1,0,-1];
const dfs = (x,y) => {

    if (dp[x][y] !== -1 ){
        return dp[x][y]
    }
    let count = 0;

    for( let i = 0; i<4; i++){
        let nx = x + dx[i];
        let ny = y + dy[i];
        if(nx>=0 && nx<r && ny>=0 && ny<c ) {
            if(input[nx][ny] < input[x][y]){
                count += dfs(nx,ny);
            }
        } 
    }

    dp[x][y] = count;
    return count;
}
console.log(dfs(0,0))
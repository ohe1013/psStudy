const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [r,c] = input.shift().split(' ').map(Number);

let dx = [-1,0,1,0];
let dy = [0,1,0,-1];
let visitAlpha = new Array(26).fill(false)
visitAlpha[input[0][0].charCodeAt() - 65] = true
let max = 0
const dfs = (x,y,count) => {
    max = Math.max(max,count)
    for( let i = 0; i<4; i++){
        let nx = x + dx[i];
        let ny = y + dy[i];
        if(nx>=0 && nx<r && ny>=0 && ny<c ) {
            if( visitAlpha[input[nx][ny].charCodeAt() - 65 ] === false) {
                visitAlpha[input[nx][ny].charCodeAt() - 65] = true;
                dfs(nx,ny,count +1);
                visitAlpha[input[nx][ny].charCodeAt() - 65] = false;
            }
        } 
    }
}
dfs(0,0,1)
console.log(max)
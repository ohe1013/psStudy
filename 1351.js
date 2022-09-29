const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N,P,Q,X,Y] = input.shift().split(' ').map(Number);

const dict = {}
dict[0] = 1;

const dfs = (k) => {
    if (dict[k] != undefined) return dict[k];
    let x = Math.floor(k/P) - X <=0 ? 0 : Math.floor(k/P) - X
    let y = Math.floor(k/Q) - Y <=0 ? 0 : Math.floor(k/Q) - Y
    dict[k] = dfs(x) + dfs(y);
    return dict[k]
}
console.log(dfs(N))

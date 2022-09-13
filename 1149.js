const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = input.shift();

// 잘 생각해보면 간단하다.
// 묶어서 생각해야하나? 아니다 dp로 접근하면된다.
// 행을 3개로 분리해서 생각한다. 그냥 3개를 계속 진행시킨다. 


// 각 행에 0, 1, 2 를넣고 구분한다 
// 근데 이게 
const cache = [];
input.forEach((item)=> {
    cache.push(item.split(' ').map(Number));
})
cache.forEach((item, i) => {
    if (i !== 0 ) {
        cache[i][0] += Math.min(cache[i-1][1], cache[i-1][2]);
        cache[i][1] += Math.min(cache[i-1][0], cache[i-1][2]);
        cache[i][2] += Math.min(cache[i-1][0], cache[i-1][1]);
    }
})
console.log(Math.min(...cache[N-1]))
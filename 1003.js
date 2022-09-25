const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let count0 = 0;
let count1 = 0;
let dp = [1];

const fibo = (n) => {
    if (n===0) {
        count0++;
        return n;
    }
    if (n===1) {
        count1++;
        return n;
    }

    if ( n >1) {
        if (dp[n] > 0) {
            return dp[n];
        }
        dp[n] = fibo(n-1) + fibo(n-2);
        return dp[n];
    }
}
//1 1 2 3 5 8 13
let N = parseInt(input.shift());
input.map(Number).forEach((item) => {
    if (item ===0 ) {
        console.log([1,0].join(' '));
    }
    else {
        console.log([fibo(item-1), fibo(item)].join(' '))
    }
})
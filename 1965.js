/*
    sort는 불가능하다.
    sort를 하지 않는 선에서, 어떻게 하는게 가장 최고일까? 같은값이 없으면 굉장히 쉬운데말이야.
    value를 dp[value]로 하기는 애매하다. 같은값도 괜찮은 것 같다.
    dp[value]를 다 0으로 박아둔다.
    그리고 index를 지나면서 하나씩 값을 넣는다.
    index가 더 작은 것 중에 가장 큰 값을 넣는다.
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const N = parseInt(input.shift());

const numArr = input.shift().split(" ").map(Number);

const dp = new Array(Math.max(...numArr) + 1).fill(0);

numArr.forEach((num) => {
    dp[num] = Math.max(...dp.slice(0, num)) + 1;
});
console.log(Math.max(...dp));

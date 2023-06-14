const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, goal] = input[0].split(" ").map(Number);

const arr = new Set(
    new Array(
        ...input
            .slice(1)
            .map(Number)
            .filter((val) => val <= goal)
    )
);

const dp = new Array(goal + 1).fill(Infinity);
dp[0] = 0;
arr.forEach((val) => {
    for (let i = val; i <= goal; i++) {
        dp[i] = Math.min(dp[i], dp[i - val] + 1);
    }
});
console.log(dp);
// arr.forEach((item) => (dp[item] = 1));
// for (let i = 1; i <= goal; i++) {
//     const _tempArr = [];
//     if (dp[i] === 1) continue;
//     else {
//         arr.forEach((item) => {
//             if (arr.has(i - item)) {
//                 if (dp[item] + dp[i - item] < dp[i]) {
//                     dp[i] = dp[item] + dp[i - item];
//                     _tempArr.push(i);
//                 }
//             }
//         });
//         arr.add(..._tempArr);
//     }
// }
console.log(dp[goal] === Infinity ? -1 : dp[goal]);

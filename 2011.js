const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
if (input[0] === "") {
    console.log(0);
    process.exit();
}
const N = input.pop();
/*
    25114는
    2/5/1/1/4
    25/1/1/4
    25/11/4
    2/5/11/4
    2/51/14
    25/1/14
    총 6가지가 나온다.

    자릿수로 접근해보자
    아마 dp를 자릿수로 접근 하는게 맞지않나 싶다
    2자리 기준으로
    2/5 
    25
    2가지가 나오지 않나 싶다.
    그리고나서 114가 3가지가 나온다
    1/1/4
    11/4
    1/14
    이렇게 계산해도 되는데, 음.. 자릿수로 접근을 해보자
    첫자리만 해보면, 2
    2자리면 2,5 25
    3자리면 2,5 25 에서 1을 붙이는것
    그리고 1을 붙이는건 2,5,1,1 2,5,11 25,1,1 25,11 각자 2배가 된다.
    그리고 4를 붙이는건 마지막 숫자에 4를 붙여서 26을 넘기면 안되기 때문에 가능한 경우에 1인 경우에만 4가 붙는다.
    마지막 숫자를 배열로 담는다. 
    2,5 25
    2,5,1 25,1
    2 개였고
    1 11 이라 2배
    4개가 되고
    1 11 에 4 붙으면 
    dp 마지막에 객체로 붙인다.
    val: 갯수
    5 1개 25 1개
    1 
*/

const dp = new Array();
dp.push({ [N[0]]: 1 });
for (let i = 1; i < N.length; i++) {
    let temp = {};
    Object.keys(dp[i - 1]).forEach((item) => {
        if (item === "0") return;
        if (parseInt(item + N[i]) > 26) {
        } else {
            if (temp[item + N[i]]) {
                temp[item + N[i]] = (BigInt(temp[item + N[i]]) + BigInt(dp[i - 1][item])) % BigInt(1000000);
            } else {
                temp[item + N[i]] = BigInt(dp[i - 1][item]) % BigInt(1000000);
            }
        }
        if (N[i] === "0") return;
        if (temp[N[i]]) {
            temp[N[i]] = (BigInt(temp[N[i]]) + BigInt(dp[i - 1][item])) % BigInt(1000000);
        } else {
            temp[N[i]] = BigInt(dp[i - 1][item]) % BigInt(1000000);
        }
    });
    dp.push(temp);
}
let answer = BigInt(0);
Object.keys(dp[N.length - 1]).forEach((item) => {
    answer += BigInt(dp[N.length - 1][item]);
});
if (N[0] === "0") console.log(0);
else {
    console.log(Number(answer % BigInt(1000000)));
}

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input = [];
// rl.on('line', function (line) {
//   input.push(line);
// }).on('close', function (){
//   const N = input.pop()

// const dp = new Array();
// dp.push({ [N[0]]: 1 });
// for (let i = 1; i < N.length; i++) {
//     let temp = {};
//     Object.keys(dp[i - 1]).forEach((item) => {
//         if (item === "0") return;
//         if (parseInt(item + N[i]) > 26) {
//         } else {
//             if (temp[item + N[i]]) {
//                 temp[item + N[i]] = BigInt(temp[item + N[i]]) + BigInt(dp[i - 1][item]);
//             } else {
//                 temp[item + N[i]] = BigInt(dp[i - 1][item]);
//             }
//         }
//         if (N[i] === "0") return;
//         if (temp[N[i]]) {
//             temp[N[i]] = BigInt(temp[N[i]]) + BigInt(dp[i - 1][item]);
//         } else {
//             temp[N[i]] = BigInt(dp[i - 1][item]);
//         }
//     });
//     dp.push(temp);
// }
// let answer = BigInt(0);
// Object.keys(dp[N.length - 1]).forEach((item) => {
//     answer += (dp[N.length - 1][item]);
// });
// if (N[0] === "0") console.log(0);
// else {
//     console.log(Number(answer % BigInt(1000000)));
// }
//   process.exit();
// });

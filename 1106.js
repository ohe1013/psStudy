// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const splitType = process.platform === "linux" ? "\n" : "\r\n";
// let input = fs.readFileSync(filePath).toString().trim().split(splitType);

// const [C, N] = input.shift().split(" ").map(Number);
// //3원에 5명 1원에 한명 6원 2원 8명 9원 15명
// //3원 1명 2원 2명 1원 3명
// //이건 배열이 1차원 아닌가? 제한이 없자나 그냥 dp[원] = 사람수
// const dp = new Array(100001).fill(0);
// for (let i = 0; i < N; i++) {
//     const [_w, _v] = input[i].split(" ").map(Number);
//     if (dp[_w] === undefined) {
//         dp[_w] = _v;
//     } else {
//         dp[_w] = Math.max(_v, dp[_w]);
//     }

//     if (dp[_w] >= C) {
//         console.log(1);
//         process.exit();
//     }
// }

// for (let i = 1; i <= 100000; i++) {

//     // const keys = Object.keys(_obj);
//     // keys.forEach((item) => {
//     //     if (_obj[i - item] !== undefined) {
//     //         _obj[i] = Math.max(_obj[item] + _obj[i - item], _obj[i] !== undefined ? _obj[i] : 0);
//     //         if (_obj[i] >= C) {
//     //             console.log(i);
//     //             process.exit();
//     //         }
//     //     }
//     // });
// }

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [C, N] = input.shift().split(" ").map(Number);

// const cases = input.map((i) => i.split(" ").map(Number));

// const sortedCase = cases.sort((a, b) => a[0] - b[0]);

// const dp = Array(C + 1).fill(Infinity);
// dp[0] = 0;
// for (let [cost, customN] of sortedCase) {
//     if (dp[customN] > cost) dp[customN] = cost;
//     for (let i = 1; i <= C; i++) {
//         dp[i] =
//             i < customN ? Math.min(dp[i], cost) : Math.min(dp[i], dp[customN] + dp[i - customN]);
//     }
// }
// console.log(dp[C]);

//3원에 5명 1원에 한명 6원 2원 8명 9원 15명
//3원 1명 2원 2명 1원 3명
//이건 배열이 1차원 아닌가? 제한이 없자나 그냥 dp[원] = 사람수
const _obj = {};
let answer = 1000000;
for (let i = 0; i < N; i++) {
    const [_w, _v] = input[i].split(" ").map(Number);
    if (_obj[_w] === undefined) {
        _obj[_w] = _v;
    } else {
        _obj[_w] = Math.max(_v, _obj[_w]);
    }
}
Object.keys(_obj).forEach((item) => {
    if (_obj[item] >= C) {
        if (answer >= item) answer = item;
    }
});
const keys = Object.keys(_obj);
for (let i = 1; i < 100001; i++) {
    keys.forEach((item) => {
        if (_obj[i - item] !== undefined) {
            _obj[i] = Math.max(_obj[item] + _obj[i - item], _obj[i] !== undefined ? _obj[i] : 0);
            if (_obj[i] >= C) {
                if (answer >= i) answer = i;
            }
        }
    });
}
console.log(_obj);
console.log(answer);
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// let input = [];

// rl.on('line', function (line) {
//   input.push(line)
// })
//   .on('close', function () {
//     const [C, N] = input.shift().split(" ").map(Number);
//     //3원에 5명 1원에 한명 6원 2원 8명 9원 15명
//     //3원 1명 2원 2명 1원 3명
//     //이건 배열이 1차원 아닌가? 제한이 없자나 그냥 dp[원] = 사람수
//     const dp = new Array(C + 1).fill(0);
//     const _obj = {};
//     for (let i = 0; i < N; i++) {
//         const [_w, _v] = input[i].split(" ").map(Number);
//         if (_obj[_w] === undefined) {
//             _obj[_w] = _v;
//         } else {
//             _obj[_w] = Math.max(_v, _obj[_w]);
//         }
//     }
//     Object.keys(_obj).forEach((item) => {
//         if (_obj[item] >= C) {
//             console.log(item);
//             process.exit();
//         }
//     });
//     let i = 1;
//     const keys = Object.keys(_obj);
//     while (true) {
//         keys.forEach((item) => {
//             if (_obj[i - item] !== undefined) {
//                 _obj[i] = Math.max(_obj[item] + _obj[i - item], _obj[i] !== undefined ? _obj[i] : 0);
//                 if (_obj[i] >= C) {
//                     console.log(i);
//                     process.exit();
//                 }
//             }
//         });
//         i++;
//     }
//   process.exit();
// });

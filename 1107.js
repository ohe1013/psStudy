const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const goal = input[0];
const count = +input[1];
const cantNum = count > 0 ? input[2].split(" ").map(Number) : [];

const availNum = new Array(10)
    .fill(0)
    .map((_, idx) => idx)
    .filter((item) => !cantNum.includes(item));

function permutation(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((v) => [v]);

    arr.forEach((v, idx, arr) => {
        const fixed = v;
        const restArr = arr;
        const permutationArr = permutation(restArr, selectNum - 1);
        const combineFix = permutationArr.map((v) => [fixed, ...v]);
        result.push(...combineFix);
    });
    return result;
}

// 맨 앞이 9일때랑 1일때 를 제외하면 다 똑같다.
// 9일때는 그 윗 자리에서 내려오는 경우
// 맨 앞이 1일때는 아래자리에서 올라오는 경우

function findFirstUpper(first, availNum, len) {
    let temp = first;
    let tempLen = len;
    while (true) {
        if (availNum.includes(temp)) {
            return { num: temp, len: tempLen };
        }
        temp++;
        if (temp > 9) {
            temp = 0;
            tempLen++;
        }
        if (temp === first && tempLen === len + 1) {
            return { num: temp, len: len };
        }
    }
}
function findFirstLower(first, availNum, len) {
    let temp = first;
    let tempLen = len;
    while (true) {
        if (availNum.includes(temp)) {
            return { num: temp, len: tempLen };
        }
        temp--;
        if (temp < 0) {
            temp = 9;
            tempLen--;
        }
        if (temp === first && tempLen === len - 1) {
            return { num: temp, len: len };
        }
    }
}
let perm1;
let perm2;
const goalInt = +goal;
let max = Math.abs(goalInt - 100);
const lower = findFirstLower(+goal[0], availNum, goal.length);
const upper = findFirstUpper(+goal[0], availNum, goal.length);
perm1 =
    lower.len <= 1
        ? [[availNum]]
        : [permutation(availNum, lower.len - 1)].map((item) => item.map((i) => [lower.num, ...i]));
perm2 = [permutation(availNum, upper.len - 1)].map((item) => item.map((i) => [upper.num, ...i]));
// if (goal.length === 6) {
//     perm = [...permutation(availNum, goal.length - 1), ...permutation(availNum, goal.length)];
// } else {
//     perm = [
//         ...permutation(availNum, goal.length - 1),
//         ...permutation(availNum, goal.length),
//         ...permutation(availNum, goal.length + 1),
//     ];
// }
perm1.forEach((i) => {
    i.forEach((item) => {
        if (item.length === 0) return;
        const num = +item.join("") - goalInt;
        const abs = Math.abs(num) + item.length;
        max = max < abs ? max : abs;
    });
});
perm2.forEach((i) => {
    i.forEach((item) => {
        if (item.length === 0) return;
        const num = +item.join("") - goalInt;
        const abs = Math.abs(num) + item.length;
        max = max < abs ? max : abs;
    });
});
console.log(max);

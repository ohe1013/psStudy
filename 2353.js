const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const firstArr = [
    "r",
    "s",
    "e",
    "f",
    "a",
    "q",
    "t",
    "d",
    "w",
    "c",
    "z",
    "x",
    "v",
    "g",
    "R",
    "E",
    "Q",
    "T",
    "W",
];

const midArr = [
    "k",
    "o",
    "i",
    "O",
    "j",
    "u",
    "p",
    "P",
    "h",
    "u",
    "n",
    "b",
    "m",
    "l",
    "hk",
    "ho",
    "hj",
    "np",
    "nl",
    "ml",
];

const lastArr = [
    "r",
    "s",
    "e",
    "f",
    "a",
    "q",
    "t",
    "d",
    "w",
    "c",
    "z",
    "x",
    "v",
    "g",
    "R",
    "T",
    "rt",
    "sw",
    "sh",
    "fr",
    "fa",
    "fq",
    "ft",
    "fx",
    "fb",
    "fg",
    "qt",
];
const onlyfirst = firstArr.filter((item) => !lastArr.includes(item));
const onlylast = lastArr.filter((item) => !firstArr.includes(item));
const common = firstArr.filter((item) => !onlyfirst.includes(item));

/*
    규칙 0. 시작은 자음으로 시작( only last는 들어가면 안됨 )
    규칙 1. 모음 다음 모음 안됨
    규칙 2. 자음 다음엔 자음 가능 
        2-1. 자음 다음에 자음인 순간 그 전에 모음이 있는지 확인, 모음이라면 lastArr에 포함되어야함
    규칙 3. onlyfirst 다음엔 무조건 모음 와야됨

    규칙을 통한 문제 해결법
    1. 일단 이 전 값을 확인한다.
    2. 첫 값에 onlylast값을 넣어놓는다. 모음 안되고, 연속으로 onlylast 안됨
    3. 
*/
const tempArr = ["qt"];
let count = 0;
const s = input[0].split("");
console.log(input[0]);

s.forEach((item) => {
    count++;
    const _temp = tempArr[tempArr.length - 1];
    if (onlylast.includes(_temp)) {
        if (midArr.includes(item)) {
            tempArr.push(item);
            return;
        }

        if (firstArr.includes(item)) {
            tempArr.push(item);
            return;
        } else {
            console.log(count);
            process.exit();
        }
    }
    if (onlyfirst.includes(_temp)) {
        if (midArr.includes(item)) {
            tempArr.push(item);
            return;
        } else {
            console.log(count);
            process.exit();
        }
    }
    if (midArr.includes(_temp)) {
        if (midArr.includes(_temp + item)) {
            tempArr[tempArr.length - 1] = _temp + item;
            return;
        } else if (midArr.includes(item)) {
            console.log(count);
            process.exit();
        }
        tempArr.push(item);
        return;
    }
    if (common.includes(_temp)) {
        if (midArr.includes(item)) {
            tempArr.push(item);
            return;
        }
        if (onlylast.includes(_temp + item) && midArr.includes(tempArr[tempArr.length - 2])) {
            tempArr.push(_temp + item);
            return;
        }
        console.log(count);
        process.exit();
    }

    tempArr.push(item);
    return;
});

console.log(0);

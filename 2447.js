const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);
/*
    처음에 비는 곳 [1,1] 1
    그 다음에 비는곳 [1,1] * 9개 +9 18
    그 다음 18* 9 + 9 * 9 243
    3 9
    9 27
    item.length
    item.length*3
*/
let S = +input[0];
const s = "*";
let item = [
    [s, s, s],
    [s, " ", s],
    [s, s, s],
];
let blank = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

const makeNewItem = (arr1, arr2, arr3) => {
    const len = arr1.length;
    const tempArr = [];
    for (let i = 0; i < len; i++) {
        tempArr.push([...arr1[i], ...arr2[i], ...arr3[i]]);
    }
    return tempArr;
};
while (S > 3) {
    let tempItem1 = makeNewItem(item, item, item);
    let tempItem2 = makeNewItem(item, blank, item);
    let tempBlank = makeNewItem(blank, blank, blank);
    item = [...tempItem1, ...tempItem2, ...tempItem1];
    blank = [...tempBlank, ...tempBlank, ...tempBlank];
    S = S / 3;
}
console.log(item.map((i) => i.join("")).join("\n"));

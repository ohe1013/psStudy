const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [r, c] = input.shift().split(" ").map(Number);

const newArr = [];
newArr.push(new Array(c + 2).fill(1));
for (let i = 0; i < r; i++) {
    newArr.push([1, ...input[i].split(" ").map(Number), 1]);
}
newArr.push(new Array(c + 2).fill(1));

const queue = [];
const empty = [];
for (let i = 0; i < r + 2; i++) {
    for (let j = 0; j < c + 2; j++) {
        if (newArr[i][j] === 2) {
            queue.push([i, j]);
        }
        if (newArr[i][j] === 0) {
            empty.push([i, j]);
        }
    }
}
const getCombinations = (array, selectNumber) => {
    const results = [];
    if (selectNumber === 1) {
        return array.map((element) => [element]);
    }
    array.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombinations(rest, selectNumber - 1);
        const attached = combinations.map((combination) => [fixed, ...combination]);
        results.push(...attached);
    });
    return results;
};
const combiArr = getCombinations(empty, 3);

const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
let max = 0;
const sumArr = (arr) => {
    let count = 0;
    arr.forEach((item) => {
        count += item.filter((i) => i === 0).length;
    });
    return count;
};

const cloneDeep = (arr) => {
    const temp = [];
    arr.forEach((item) => {
        temp.push([...item]);
    });
    return temp;
};
combiArr.forEach((combi) => {
    const [_1, _2, _3] = combi;
    const temp = cloneDeep(newArr);
    const _queue = [...queue];
    temp[_1[0]][_1[1]] = 1;
    temp[_2[0]][_2[1]] = 1;
    temp[_3[0]][_3[1]] = 1;
    while (_queue.length > 0) {
        const newQ = _queue.pop();
        for (let d of dir) {
            const newX = newQ[0] + d[0];
            const newY = newQ[1] + d[1];
            if (temp[newX][newY] === 0) {
                temp[newX][newY] = 2;
                _queue.push([newX, newY]);
            }
        }
    }
    max = max > sumArr(temp) ? max : sumArr(temp);
});
console.log(max);

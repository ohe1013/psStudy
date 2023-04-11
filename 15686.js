const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);

const arr = [];
const houses = [];
const chickens = [];

input.forEach((item, idx) => {
    arr.push(item.split(" ").map(Number));
});
const getDistance = (house, chicken) => {
    return Math.abs(house[0] - chicken[0]) + Math.abs(house[1] - chicken[1]);
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (arr[i][j] === 1) {
            houses.push([i, j]);
        }
        if (arr[i][j] === 2) {
            chickens.push([i, j]);
        }
    }
}

const getCombination = (arr, count) => {
    const results = [];
    if (count === 1) {
        return arr.map((item) => [item]);
    }
    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombination(rest, count - 1);
        const attached = combinations.map((combination) => [fixed, ...combination]);
        results.push(...attached);
    });
    return results;
};
let answer = Infinity;

const dfs = (depth) => {
    if (depth > 0 && depth <= M) {
        getCombination(chickens, depth).forEach((combis) => {
            let _answer = 0;
            houses.forEach((house) => {
                let temp = Infinity;
                combis.forEach((combi) => {
                    temp = temp < getDistance(house, combi) ? temp : getDistance(house, combi);
                });
                _answer += temp;
            });
            answer = answer < _answer ? answer : _answer;
        });
    }
    if (depth === chickens.length) return;
    dfs(depth + 1);
};
dfs(0);
console.log(answer);

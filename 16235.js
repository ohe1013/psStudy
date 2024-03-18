const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
const input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M, K] = input.shift().split(" ").map(Number);
class Deque {
    constructor() {
        this.arr = [];
        this.head = 0;
        this.tail = 0;
    }
    push_front(item) {
        if (this.arr[0]) {
            for (let i = this.arr.length; i > 0; i--) {
                this.arr[i] = this.arr[i - 1];
            }
        }
        this.arr[this.head] = item;
        this.tail++;
    }
    push_back(item) {
        this.arr[this.tail++] = item;
    }
    pop_front() {
        if (this.head >= this.tail) {
            return null;
        } else {
            const result = this.arr[this.head++];
            return result;
        }
    }
    pop_back() {
        if (this.head >= this.tail) {
            return null;
        } else {
            const result = this.arr[--this.tail];
            return result;
        }
    }
}
/**
 * 이 나무는 사계절을 보내며, 아래와 같은 과정을 반복한다.

봄에는 나무가 자신의 나이만큼 양분을 먹고, 나이가 1 증가한다. 
각각의 나무는 나무가 있는 1×1 크기의 칸에 있는 양분만 먹을 수 있다. 
하나의 칸에 여러 개의 나무가 있다면, 나이가 어린 나무부터 양분을 먹는다. 
만약, 땅에 양분이 부족해 자신의 나이만큼 양분을 먹을 수 없는 나무는 
양분을 먹지 못하고 즉시 죽는다.

여름에는 봄에 죽은 나무가 양분으로 변하게 된다. 
각각의 죽은 나무마다 나이를 2로 나눈 값이 나무가 있던 칸에 양분으로 추가된다. 
소수점 아래는 버린다.

가을에는 나무가 번식한다. 
번식하는 나무는 나이가 5의 배수이어야 하며, 
인접한 8개의 칸에 나이가 1인 나무가 생긴다. 
어떤 칸 (r, c)와 인접한 칸은 
(r-1, c-1), (r-1, c), (r-1, c+1), (r, c-1), (r, c+1), (r+1, c-1), (r+1, c), (r+1, c+1) 이다. 
상도의 땅을 벗어나는 칸에는 나무가 생기지 않는다.

겨울에는 S2D2가 땅을 돌아다니면서 땅에 양분을 추가한다. 
각 칸에 추가되는 양분의 양은 A[r][c]이고, 입력으로 주어진다.

K년이 지난 후 상도의 땅에 살아있는 나무의 개수를 구하는 프로그램을 작성하시오.
 */
const map = new Array(N).fill(0).map((_) => new Array(N).fill(5));
const A = [];
for (let i = 0; i < N; i++) {
    A.push(input[i].split(" ").map(Number));
}
const trees = {};
let deadTrees = {};
for (let i = N; i < N + M; i++) {
    const [x, y, o] = input[i].split(" ").map(Number);
    trees[JSON.stringify([x, y])] = new Deque();
    trees[JSON.stringify([x, y])].push_back(o);
}

const spring = (map, trees) => {
    const keys = Object.keys(trees);
    keys.forEach((key) => {
        const [x, y] = JSON.parse(key);
        const values = trees[key].arr;
        let temp = new Deque();
        for (let i = values.length - 1; i >= 0; i--) {
            const value = values[i];
            if (map[x - 1][y - 1] - value >= 0) {
                temp.push_front(value + 1);
                map[x - 1][y - 1] -= value;
            } else {
                if (deadTrees[JSON.stringify([x, y])]) {
                    deadTrees[JSON.stringify([x, y])].push(value);
                } else {
                    deadTrees[JSON.stringify([x, y])] = [value];
                }
            }
        }
        trees[key] = temp;
    });
};
const summer = (map, deadTrees) => {
    const keys = Object.keys(deadTrees);
    keys.forEach((key) => {
        const [x, y] = JSON.parse(key);
        map[x - 1][y - 1] += deadTrees[key].reduce((prev, cur) => prev + parseInt(cur / 2), 0);
    });
};
const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 1],
    [1, 0],
    [0, 1],
    [0, -1],
];
const autumn = (map, trees) => {
    const keys = Object.keys(trees);
    keys.forEach((key) => {
        const arr = trees[key].arr;
        arr.forEach((item) => {
            if (item > 0 && item % 5 == 0) {
                const [x, y] = JSON.parse(key);
                for (const dir of dirs) {
                    const [newX, newY] = [x + dir[0] - 1, y + dir[1] - 1];
                    if (newX >= 0 && newX < N && newY >= 0 && newY < N) {
                        if (trees[JSON.stringify([newX + 1, newY + 1])]) {
                            trees[JSON.stringify([newX + 1, newY + 1])].push_back(1);
                        } else {
                            trees[JSON.stringify([newX + 1, newY + 1])] = new Deque();
                            trees[JSON.stringify([newX + 1, newY + 1])].push_back(1);
                        }
                    }
                }
            }
        });
    });
};
const winter = (A, map) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            map[i][j] = A[i][j] + map[i][j];
        }
    }
};
let count = 0;
while (count != K) {
    spring(map, trees);
    summer(map, deadTrees);
    deadTrees = {};
    autumn(map, trees);
    winter(A, map);
    count++;
}

const keys = Object.keys(trees);
let answer = 0;
keys.forEach((key) => {
    answer += trees[key].arr.length;
});
console.log(answer);

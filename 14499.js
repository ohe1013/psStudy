const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/**
 * 
 * 크기가 N×M인 지도가 존재한다. 지도의 오른쪽은 동쪽, 위쪽은 북쪽이다. 이 지도의 위에 주사위가 하나 놓여져 있으며, 주사위의 전개도는 아래와 같다. 지도의 좌표는 (r, c)로 나타내며, r는 북쪽으로부터 떨어진 칸의 개수, c는 서쪽으로부터 떨어진 칸의 개수이다. 

  2
4 1 3
  5
  6

한칸 좌측으로 돌리면

  2
6 4 1  
  5
  3
한칸 우측으로 돌리면
  2
1 3 6 
  6
  4
  
한칸 위측으로 돌리면
 1
453 
 6
 2

주사위를 놓은 곳의 좌표와 이동시키는 명령이 주어졌을 때, 주사위가 이동했을 때 마다 상단에 쓰여 있는 값을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 지도의 세로 크기 N, 가로 크기 M (1 ≤ N, M ≤ 20), 주사위를 놓은 곳의 좌표 x, y(0 ≤ x ≤ N-1, 0 ≤ y ≤ M-1), 그리고 명령의 개수 K (1 ≤ K ≤ 1,000)가 주어진다.

둘째 줄부터 N개의 줄에 지도에 쓰여 있는 수가 북쪽부터 남쪽으로, 각 줄은 서쪽부터 동쪽 순서대로 주어진다. 주사위를 놓은 칸에 쓰여 있는 수는 항상 0이다. 지도의 각 칸에 쓰여 있는 수는 10 미만의 자연수 또는 0이다.

마지막 줄에는 이동하는 명령이 순서대로 주어진다. 동쪽은 1, 서쪽은 2, 북쪽은 3, 남쪽은 4로 주어진다.

*/
const [N, M, x, y, count] = input.shift().split(" ").map(Number);
const dirs = input.pop().split(" ").map(Number);

const map = input.map((item) => item.split(" ").map(Number));

//dice의 정중앙은 [1][1]
const dice = [[0], [0, 0, 0], [0], [0]];

const moveDice = (type) => {
    if (type === 1) {
        const temp = dice[3][0];
        dice[3] = [dice[1][0]];
        dice[1] = [dice[1][1], dice[1][2], temp];
    } else if (type === 2) {
        const temp = dice[3][0];
        dice[3] = [dice[1][2]];
        dice[1] = [temp, dice[1][0], dice[1][1]];
    } else if (type === 3) {
        let a = dice[0][0];
        let b = dice[1][1];
        let c = dice[2][0];
        let d = dice[3][0];
        dice[0][0] = d;
        dice[1][1] = a;
        dice[2][0] = b;
        dice[3][0] = c;
    } else if (type === 4) {
        let a = dice[0][0];
        let b = dice[1][1];
        let c = dice[2][0];
        let d = dice[3][0];

        dice[0][0] = b;
        dice[1][1] = c;
        dice[2][0] = d;
        dice[3][0] = a;
    }
    return { bottom: dice[1][1], top: dice[3][0] };
};

const setDice = ({ bottom }) => {
    dice[1][1] = bottom;
};

const move = (type, x, y) => {
    switch (type) {
        case 1:
            y = y + 1;
            break;
        case 2:
            y = y - 1;
            break;
        case 3:
            x = x - 1;
            break;
        case 4:
            x = x + 1;
            break;
    }
    return { x, y };
};
const isMapZero = ({ x, y }) => {
    if (map[x][y] === 0) return true;
    else return false;
};

const current = {
    x: x,
    y: y,
};
dirs.forEach((item) => {
    const { x, y } = move(item, current.x, current.y);
    if (x < 0 || x > N - 1 || y < 0 || y > M - 1) return;
    current.x = x;
    current.y = y;
    const { bottom, top } = moveDice(item);
    if (isMapZero({ x, y })) {
        map[x][y] = bottom;
    } else {
        setDice({ bottom: map[x][y] });
        map[x][y] = 0;
    }
    console.log(top);
});

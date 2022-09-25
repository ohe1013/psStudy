const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    이 문제를 잘 보자
    좌로 밀착시키면 같은값이면 그냥 합쳐지고 밀린다.
    끝에서부터 하면된다. 우선순위가 어케되는거지?
    구석먼저다
    브루트포스는 이해가는데 백트래킹이 이해가안되는데
    dfs로 풀수있나?
    그냥 풀면 왜틀린거지? 어차피 5번하는거면 움직일수있는게 4의 5승이라 1024가지밖에없는데
    아 그냥 그런건가, u r d l 로해서 계속 돌리는걸 dfs라고 말한건가? 그렇게 브루포스로 풀면되나?
    구현을 어떻게 할지 생각해보자

    u를 눌렀다고 생각해보자,
    그 배열의 값을 기준으로 보면, 위로 누르면, 값이 더해지면서 
*/


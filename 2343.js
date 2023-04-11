const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);
const numSeq = input[0].split(" ").map(Number);
let start = Math.max(...numSeq);
let end = numSeq.reduce((prev, cur) => prev + cur, 0);

while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let temp = 0;
    let cnt = 0;
    for (let i = 0; i < N; i++) {
        if (temp + numSeq[i] > mid) {
            cnt = cnt + 1;
            temp = 0;
        }
        temp = temp + numSeq[i];
    }
    if (temp != 0) cnt++;
    //cnt가 더 많다는건 mid 값이 작으니까 계속 생기는거자나
    if (cnt > M) {
        start = mid + 1;
    } else {
        end = mid - 1;
    }
}

console.log(start);

/*
강토는 자신의 기타 강의 동영상을 블루레이로 만들어 판매하려고 한다. 블루레이에는 총 N개의 강의가 들어가는데,
 블루레이를 녹화할 때, 강의의 순서가 바뀌면 안 된다. 순서가 뒤바뀌는 경우에는 강의의 흐름이 끊겨,
  학생들이 대혼란에 빠질 수 있기 때문이다. 즉, i번 강의와 j번 강의를 같은 블루레이에 녹화하려면
   i와 j 사이의 모든 강의도 같은 블루레이에 녹화해야 한다.

강토는 이 블루레이가 얼마나 팔릴지 아직 알 수 없기 때문에, 블루레이의 개수를 가급적 줄이려고 한다. 
오랜 고민 끝에 강토는 M개의 블루레이에 모든 기타 강의 동영상을 녹화하기로 했다. 
이때, 블루레이의 크기(녹화 가능한 길이)를 최소로 하려고 한다. 단, M개의 블루레이는 모두 같은 크기이어야 한다.

강토의 각 강의의 길이가 분 단위(자연수)로 주어진다. 이때, 가능한 블루레이의 크기 중 최소를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 강의의 수 N (1 ≤ N ≤ 100,000)과 M (1 ≤ M ≤ N)이 주어진다. 
다음 줄에는 강토의 기타 강의의 길이가 강의 순서대로 분 단위로(자연수)로 주어진다. 
각 강의의 길이는 10,000분을 넘지 않는다.

출력
첫째 줄에 가능한 블루레이 크기중 최소를 출력한다.

예제 입력 1 
9 3
1 2 3 4 5 6 7 8 9
예제 출력 1 
17
힌트
강의는 총 9개이고, 블루레이는 총 3개 가지고 있다.

1번 블루레이에 1, 2, 3, 4, 5, 2번 블루레이에 6, 7, 3번 블루레이에 8, 9 를 넣으면 각 블루레이의 크기는 15, 13, 17이 된다. 블루레이의 크기는 모두 같아야 하기 때문에, 블루레이의 크기는 17이 된다. 17보다 더 작은 크기를 가지는 블루레이를 만들 수 없다.

강의를 잘 분할해야한다. 이 경우엔 3개로 잘 분할해야한다. 사이즈를 총 합으로 해서
강의의 합을 잘 생각해보자.
내가 이 문제를 처음 받았다면, dfs로 풀려고 했을까?
그건 좀 아찔한데,

나눠서 더한 값의 최소가 이 값의 최대보다 작아져야한다.
최대가 최소보다 작아진다. 
원리자체는 이분탐색이 맞는데.. 
hi, lo를 뭐로 정할지가 고민인데
이 경우에 6개로 나눈다고하면 어떻게 푸냐? 이 경우엔 9가 중간값보다 크니까 그냥 저거 하나 갖는 값이 젤 큰 값 아닐까 싶긴하다.
그럼 4개인경우엔? 11.25? 그럼 9랑 91 82 73 64 5 로 두는게 최선이다. 근데 이거 안된다 4개로 나눠야해서
921 83 74 65 아마 이게 최선이려나? 
아.. 적어도 돼?

그럼 어케 풀어야되냐

94라고하면 95

오케이 cnt = 0 에서부터 올린다.
근데 어떻게 올릴지를 생각해보자.
ex 를 가지고
start 9 end 45
mid 27
cnt가 1 에서 올라가는거니깐 
이 문제는 맹점을 가지고있다.
작은숫자부터 커진다는 것이다.
그리고 순서대로 담아야 한다는 것이다.
cnt가 커진다는건 중간값이 너무 작다는 거고,
cnt가 작다는건 중간값이 너무 크다는 거다.


*/
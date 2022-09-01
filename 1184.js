const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

// 이 문제 푸는법
// 한 점을 기점으로 왼쪽위 아래쪽 아래의 합 조합을 모두 찾는다.

let N = input.shift();
if (N === 1 )return 0;
for( let i=0; i<N; i++){
    input[i] = input[i].split(' ').map(Number);
}

// ㅁㅁㅁㅁ
// ㅁㅁㅁㅁ
// ㅁㅁㅁㅁ
// ㅁㅁㅁㅁ
//아니다 규칙을 만들자.
//LU를 할때 index를 포함한다
// 예를들어 1,1 까지라면, 1,1을 포함한다.
let sumArr = [...Array(51)].map(() => new Array(51).fill(0));
let sum1 = [];
let sum2 = [];
const sumLU = ( x, y) => {
    for (let i = x; i >= 0; i-- ){
        let sum = 0;
        for (let j = y; j >= 0; j--) {
            sum += input[i][j];

            if ( i!=x ){
                sumArr[i][j] = sumArr[i + 1][j] + sum;
            } else {
                sumArr[i][j] = sum;
            }
            sum1.push(sumArr[i][j])
        }
    }
}
const sumRD = ( x, y) => {
    for (let i = x; i < N; i++ ){
        let sum = 0;
        for (let j = y; j <N; j++) {
            sum += input[i][j];

            if ( i!=x ){
                sumArr[i][j] = sumArr[i - 1][j] + sum;
            } else {
                sumArr[i][j] = sum;
            }
            sum2.push(sumArr[i][j])
        }
    }
}
const sumLD = ( x, y) => {
    for (let i = x; i < N; i++ ){
        let sum = 0;
        for (let j = y; j >= 0; j--) {
            sum += input[i][j];

            if ( i!=x ){
                sumArr[i][j] = sumArr[i - 1][j] + sum;
            } else {
                sumArr[i][j] = sum;
            }
            sum1.push(sumArr[i][j])
        }
    }
}
const sumRU = ( x, y) => {
    for (let i = x; i >= 0; i-- ){
        let sum = 0;
        for (let j = y; j< N; j++) {
            sum += input[i][j];

            if ( i!=x ){
                sumArr[i][j] = sumArr[i + 1][j] + sum;
            } else {
                sumArr[i][j] = sum;
            }
            sum2.push(sumArr[i][j])
        }
    }
}

let ans = 0;

for( let i =0; i < N-1; i++) {
    for (let j=0; j< N-1; j++) {
        sumArr = [...Array(51)].map(() => new Array(51).fill(0));
        sumLU(i,j);
        sumRD(i + 1,j + 1);
        
        for (let s1 of sum1) {
            for (let s2 of sum2) {
                if (s1 === s2) ans ++;
            }
        }
        sum1 = [];
        sum2 = [];

        sumRU(i , j +1);
        sumLD(i + 1,j );
        
        for (let s1 of sum1) {
            for (let s2 of sum2) {
                if (s1 === s2) ans ++;
            }
        }
        sum1 = [];
        sum2 = [];
    }
}
console.log(ans)
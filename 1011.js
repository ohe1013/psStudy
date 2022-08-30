const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let n = input.shift();

//피보나치랑 비슷하지않나?
//마지막에는 1만 와야된다는데
//그럼 문제되는게 마지막이 되기 전에 어떻게 감소시킬 것 인가??
//계속 체크를 하는 부분을 만들어야한다.
// 현재 값이 a라고하고, 남은 값이 n일때
// a(a+1)/2 == n 일때 부터 내려가면된다.
// 경계가 조금 애매하다.
// 1, 11, 111 3, 121 4,1211 5, 1221 6, 12211 7, 12221 8, 12321, 123211, 123221, 1233211 13, 
// 1233211로 해보자
// 13일때 1233211이다.
// a(a+1)/2 a=1일때 1 a=2일때 3 a=3일때 6 a=4일대 10 a=5일때 15 a=6일때 21 a=6일때 21
// 13일때 맨처음은 1
// 그 다음에 n = 12  a=2일때도 3 이니까 2 작성
// 그 다음에 n= 10 a=3일때도 6이니까 3작성
// 그 다음에 n= 7 a=4일대 10인데 그건 안됨 3일땐 6이니까 3작성
// 그 다음에 n= 4 a=3일대 6인데 그건 안됨 2일때 3이니까 2작성 
// 그 다음에 n=2 a=2일대 3인데 그건안됨 1일때 1이니깐 1 작성
// 그 다음에 n=1 a=1일대 1인데 딱 맞음 그거 작성
const sum = (val) => {
    return val * (val +1) / 2;
}

for(let i=0; i< n; i++) {
    let [s,f] = input[i].split(' ').map(Number);
    let d = f-s;
    let a = 1;
    let result = [1];
    while(d>0) {
        d = d-a;
        if( d >= sum(a+1)) {
            a++;
        } else if ( d >= sum(a)){
            a=a;
        } else {
            a--;
        }
        if ( a===0) continue;
        result.push(a);
    }
    console.log(result.length)
}


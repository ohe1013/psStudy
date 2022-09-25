const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());

//규칙을 찾는 방법 무조건 a*n + b 이다. 2번째에서 3번째로 갈때도 같은 a와 b 이다. 
// 첫번째 값을 an+b라고하면 두번쨰는 a(an+b) +b a^2n+ab +b 이다.
// 첫번째 항에서 a와 b를 찾는다. 그리고나서부터는 거기에 있는거중에서 추려나가는식으로 진행한다.
// 마지막항을 끝낸 후 a,b의 갯수로 보면된다. 
// 굳이 이렇게 풀 필요가 있을까 1항 2항 2항 3항 비교해보면 무조건 an +b 형식을 띌것이다.
// 
input[0] = input[0].split(' ').map(Number);
if( N > 2) {
    if (input[0][1] - input[0][0] !== 0 ){
        let a = (input[0][2] - input[0][1])/( input[0][1] - input[0][0]);
        let b = input[0][1] - input[0][0] * a;

        if(a !== parseInt(a) || b !== parseInt(b) ) {
            return console.log('B');
        }

        for(let i = 1; i < N-1; i++) {
            if(input[0][i]*a +b !== input[0][i+1] ) {
                return console.log('B');
            }
        }
        console.log(input[0][N-1]*a + b);
    } else {
        for(let i = 1; i < N-1; i++) {
            if(input[0][i] !== input[0][i+1] ) {
                return console.log('B');
            }
        }
        console.log(input[0][0])
    }
        
}else if (N >1) {
    if (input[0][0] === input[0][1]) {
        console.log(input[0][0]);
    } else{
        console.log('A');
    }
} else {
    console.log('A');
}
// // a,b찾기
// let able = []
// if (N > 2) {
//     let [prev, next] = [parseInt(input[0].split(' ')[0]), parseInt(input[0].split(' ')[1])];
//     const maxQ = parseInt(next/prev);  //maxQ가 0일때는 12 9 이런식으로 진행되면 사실 parseint값을 하면 0이 나오겠지만 이따생각
//     if (maxQ > 0 ) {
//         for (let i=1; i<= maxQ; i++) {
//             let a = i;
//             let b = next - prev*i;
//             able.push([a,b]);
//         }
//     }else {

//     }

//     for(let i =1; i<input[0].split(' ').length-1; i++){
//         let [prev, next] = [parseInt(input[0].split(' ')[i]), parseInt(input[0].split(' ')[i+1])];
//         able = able.filter((item) => {
//             return next == prev*item[0] + item[1];
//         })
//     }
// }

// if (able.length > 1) {
//     console.log('A');
// } else if (able.length === 0) {
//     console.log('B')
// } else {
//     console.log(able[0].join(' '))
// }
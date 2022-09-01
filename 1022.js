const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

//00을 기준으로 11 22 갈때마다 3의 제곱 5의 제곱 이런식으로 늘어난다.
// 그리고 해당 행을 기준으로 2n + 1 개가 있다.
// -3 -2 2 0 이면 행은 -3 에서 2까지 가고, 열은 -2에서 0까지 가야되니까
// 행이 -3이니까 7개가 있고, 이건 -3-3부터 -3 3 까지다.
// 아니다 해당 좌표의 값이 뭔지 바로알면 풀 수 있다.
// 어떻게알수있나 00을 기준으로 
// 예를들어 -500 0값을 어떻게 아나? -500 -500값은 알 수 있다. 아니 500의 500값은 알수있다. 1001의 제곱이다. 그리고 값이 
// 2n+1의 제곱을 기준으로 4가지 조건으로 만들면된다.

const [r1,c1,r2,c2] = input[0].split(' ').map(Number);
const tornado = [...new Array(r2-r1 +1)].map(()=> new Array(c2-c1 +1));
let vMax= 0;
for(let i = r1; i<= r2; i++) {
    for( let j = c1; j <= c2; j++){
        let max = Math.abs(i) > Math.abs(j) ? Math.abs(i) : Math.abs(j);
        let maxVal = (max*2 + 1) * (max*2 + 1);
        console.log(i,j,max)
        if (i == max ) {
            maxVal -= (max-j);
        } else if ( j == -max) {
            maxVal = maxVal - (max*2 + max-i)
        } else if ( i == -max) {
            maxVal = maxVal - (max*4 +  max+j)
        } else if (j == max){
            maxVal = maxVal - (max*6 + max+i)
        }
        tornado[i-r1][j-c1] = maxVal;
    }
}
tornado.forEach((item) => {
    vMax = vMax > Math.max(...item) ? vMax: Math.max(...item);
})

vMax = vMax +'';
let l = vMax.length;

for (let i=0; i<tornado.length; i++){
    for( let j=0; j<tornado[0].length; j++) {
        let val = tornado[i][j]+'';
        let asd = val.length
        for (let k =0; k< l-asd; k++){
            val = ' ' +val;
        }
        tornado[i][j] = val
    }
}

console.log( tornado.map((item) => item.join(' ')).join('\n'))
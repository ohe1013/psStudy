const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let answer = 0;
let n = input.shift();
for(let i=0 ; i< n; i++){
    let [x1,y1,r1, x2,y2,r2] = input[i].split(' ');
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);
    r1 = parseInt(r1);
    r2 = parseInt(r2);
    const d = Math.sqrt((Math.pow(x1-x2,2) + Math.pow(y1-y2,2)));
    if (d === 0){
        if (r1 === r2) {
            answer = -1;
        } else {
            answer = 0;
        }
    } else{
        if ( d > r1+r2) answer = 0;
        if ( d < Math.abs(r1-r2)) answer = 0;
        if ( d === r1+r2) answer = 1;
        if ( d === Math.abs(r1-r2)) answer = 1;
        if ( d > Math.abs(r1-r2) && d < r1+r2 ) answer = 2;
    }
    console.log(answer)
}

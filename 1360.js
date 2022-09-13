const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = input.shift();

const res = '';
const arr = [];
const undo = [];
input.forEach((item, index) => {
    const [type, key, time ] = item.split(' ');
    const prev = index === 0 ? parseInt(time) : parseInt(input[index-1].split(' ')[2]);
    for(let i = 1; i<parseInt(time) - prev; i++){
        arr.push('-');
    }
    if (type === 'type') {
        arr.push(key);
    } else{
        for( let i = 0; i < parseInt(key); i++){
            undo[parseInt(time)].push(arr.pop())
        }
        arr.push('u');

    }
})

console.log(arr,undo)
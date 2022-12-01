const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const machine = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

let luggage = input[3]
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

if (Math.max(...luggage) > Math.max(...machine)) return console.log(-1);

let count = 0;
while (luggage.length > 0) {
    count++;
    let temp = [];
    const alreadyWokredMachine = Array(parseInt(luggage.length)).fill(false);
    luggage.forEach((l) => {
        temp.push(l);
        for (let i = 0; i < machine.length; i++) {
            if (machine[i] >= l && alreadyWokredMachine[i] === false) {
                alreadyWokredMachine[i] = true;
                temp.pop();
                break;
            }
        }
    });
    luggage = [...temp];
}

console.log(count);

let input = require('fs').readFileSync('example.txt').toString().split('\n'); /// /dev/stdin
let result = [];
let stack = [];
for (let i = 1; i < input.length - 1; i++) {
    input[i] = input[i].replace('\r', '');
    let operation = input[i].split(' ')[0];
    switch (operation) {
        case 'push':
            stack.push(input[i].split(' ')[1]);
            break;
        case 'pop':
            if (stack.length === 0) result.push(-1);
            else {
                result.push(stack[stack.length - 1]);
                stack.pop();
            }
            break;
        case 'size':
            result.push(stack.length);
            break;
        case 'empty':
            if (stack.length === 0) result.push(1);
            else result.push(0);
            break;
        case 'top':
            if (stack.length === 0) result.push(-1);
            else result.push(stack[stack.length - 1]);
            break;
    }
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let input;
    rl.on("line", function (line) {
        input = line;
        // input = parseInt(line); // 입력 값이 정수라면 parseInt로 형변환
        rl.close();
    }).on("close", function () {
        solution(input);
        process.exit();
    })


}
console.log(result.join('\n'));
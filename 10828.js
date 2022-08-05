let input = require('fs').readFileSync('example.txt').toString().split('\n'); /// /dev/stdin
let result = [];
let stack = [];
console.log
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



}
console.log(result.join('\n'));
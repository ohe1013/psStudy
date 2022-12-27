const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const N = parseInt(input.shift());

/*
    rule
    1. 답은 ti 제일 작은 값보다 작다.
    2. 그럼 중요한건 ti가 가장 작은 값 중에서 한번에 일괄 처리했을때 가능한지 체크해야한다.
    3. 모든 일을 하긴 해야한다.
    ex) 4번이 3 10이 아니라 3 9였으면 
    4. 그럼 붙여서 일을 해야한다.
    5. 그니깐 ti가 작은것부터 몰아서 붙여야한다.
    6. 그럼 이렇게 생각 할 수 있다. 일단 7, 8 에 민다. 그리고나서 3 10이 해결안되니까 한간을 앞으로 민다. 그리고나서 뒤에게 되는지 계속 체크하면서 앞으로 밀면해결가능하지않을까?
    
    정리
    1. 최대한 뒤로 붙인다. 
    2. 뒤로 붙이는데 불가능하면 칸을 땡긴다.
    3. 이 칸을 떙기는걸 하나하나 하면 늦어지려나? 
    4. 땡길 필요가 없지않나 그냥 갖다 붙이는거나 똑같자나 어차피 한번에 한다고해도 한칸씩 떙기는건데
    
    예시 풀어보면
    ti가 제일 작은거 8에 7, 8에 2를 붙여 잉여 칸 6

    배열을 다르게 만들자.

    하나하나 체크하지말고 덩어리로 체크하자.
    시간 청크를 만든다.

    [s, e]를 만들고 겹치는 만큼 앞에 덧 붙여서 하나의 청크를 만든다.
    끝에서부터 시작하면 빈 공간을 고려할 필요가 없어진다.
    끝나는 시간 기준으로 내림차순으로 정렬한다.
    1,13 이면 무지껀 시작해야하는날이 13, 끝 13
    3 10 이면 무지껀 시작하는날이 8, 끝 10이다.
    2 8 이면 무지껀 시작하는날이 7, 끝 8이다.
    무지껀 시작해야하는날  13 이 끝이다.
    3 10 끝나는날이 1 13이랑 상관 없어진다. 그럼 8이 끝이다.
    2 8이면 8이 끝이라 겹친다. 그럼 겹치는 날만큼 무지껀 시작지점을 뺀다. 7에서 1을 뺴서 6



*/
const sdt = input.map((item) => {
  const [start, end] = item.split(" ").map(Number);
  return [end - start + 1, start, end];
});
sdt.sort((a, b) => b[2] - a[2]);
//무지껀 시작지점
let s = sdt[0][0];

for (let i = 1; i < N; i++) {
  // 무지껀 시작지점이 end보다 크면 그냥 빈 공간이니까 무지껀 시작지점을 앞의 무지껀 시작지점으로 이동
  if (s > sdt[i][2]) {
    s = sdt[i][0];
  } else {
    //무지껀 시작지점이랑 겹치면 무지껀 시작지점에서 차이만큼 뺀다
    s = sdt[i][0] - (sdt[i][2] - s + 1);
  }
}
console.log(s - 1);

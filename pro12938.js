// n	s	result
// 2	9	[4, 5]
// 2	1	[-1]
// 2	8	[4, 4]
// 차이가 적은게 젤 좋다.
// n으로 나눌수 있는 가장 가까운값을 만든다.
// 그때 추가된 값만큼 for문을 돌면서 더하거나 뺀다.
// 빼는식으로 간다고해보자
function solution(n, s) {
    if (n > s) return [-1]
    const share = Math.floor(s/n);
    const last = s  - share * n ;
    const arr = new Array(n).fill(share)
    for(let i=0; i<last; i++) {
        arr[n-i-1]+=1
    }
    return arr;
}

console.log(solution(3,8))

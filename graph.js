/*

n명의 권투선수가 권투 대회에 참여했고 각각 1번부터 n번까지 번호를 받았습니다. 

권투 경기는 1대1 방식으로 진행이 되고, 만약 A 선수가 B 선수보다 실력이 좋다면 A 선수는 B 선수를 항상 이깁니다. 

심판은 주어진 경기 결과를 가지고 선수들의 순위를 매기려 합니다. 하지만 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없습니다.

선수의 수 n, 경기 결과를 담은 2차원 배열 results가 매개변수로 주어질 때 정확하게 순위를 매길 수 있는 선수의 수를 
return 하도록 solution 함수를 작성해주세요.

제한사항
선수의 수는 1명 이상 100명 이하입니다.
경기 결과는 1개 이상 4,500개 이하입니다.
results 배열 각 행 [A, B]는 A 선수가 B 선수를 이겼다는 의미입니다.
모든 경기 결과에는 모순이 없습니다.
입출력 예
n	results	return
5	[[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]	2
입출력 예 설명
2번 선수는 [1, 3, 4] 선수에게 패배했고 5번 선수에게 승리했기 때문에 4위입니다.
5번 선수는 4위인 2번 선수에게 패배했기 때문에 5위입니다.

4 -> 3->2 ->5
1->2 ->5
위 아래의 숫자를 정확히 아는 부분에선 구할 수있다.
2는 위에 3 아래에 1 
5는 위에 4

있는 숫자를 가지고 2번을 그리면된다.
1번 아래에 2 
2번 아래에 5
3번 아래에 2
4번 아래에 3,2
5번 아래에 x
1 [][2]
2 [][5]
3 [][2]
4 [][2,3]
5 [][]
*/

function solution(n, results) {
    var answer = 0;
    const arr = new Array(n + 1).fill(0).map(() => [[], []]);
    results.forEach((result) => arr[result[0]][1].push(result[1]));

    function dfs(index, indexArr) {
        if (arr[index][1].length === 0) {
            return;
        } else {
            indexArr.push(index);
        }
        for (let i = 0; i < arr[index][1].length; i++) {
            let item = arr[index][1][i];
            console.log(arr, indexArr, item);
            indexArr.forEach((i) => {
                arr[i][1] = Array.from(new Set([...arr[i][1], item]));
            });
            arr[item][0] = Array.from(new Set([...arr[item][0], ...indexArr]));
            dfs(item, indexArr);
            if (indexArr.includes(index)) return;
        }
    }
    for (let i = 1; i <= n; i++) {
        dfs(i, [], []);
    }

    arr.forEach((item) => {
        if (item[0].length + item[1].length === n - 1) answer++;
    });
    return answer;
}

solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
]);

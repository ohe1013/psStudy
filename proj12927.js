
const tickets = [["ICN", "A"], ["A", "B"], ["A", "C"], ["C", "A"], ["B", "D"]]
function solution(tickets) {
    const graph = {}
    const answer = []
    tickets = tickets.sort((a,b)=> a[1].charCodeAt() - b[1].charCodeAt())
    tickets.forEach(item=> {
        graph[item[0]]= graph[item[0]] === undefined ?  [item[1]] : [...graph[item[0]],item[1]]
    })
    let path = ["ICN"]
    let cache = []
    const dfs = (from,obj) => {
        const temp = {...obj}// graph
        const toArr = temp[from] // destination List
        if (path.length > tickets.length+1) {
            path = cache
            return
        }
        if ( toArr === undefined || toArr.length === 0 ) {
            if (path.length === tickets.length+1) {
                answer.push(path)
            } else {
                path = cache
            }
            return
        } 
        cache = [...path]
        toArr.forEach((to) =>{
            //graph에서 목적지 하나 삭제
            const _temp = {...temp}
            const sss =  _temp[from].filter(dest => dest === to)
            console.log("sss",to,sss)
            if(sss.length >1){
                _temp[from] = sss.slice(1) // graph 에서 목적지 빼고 넣어줌
            } else {
                _temp[from] = _temp[from].filter(dest => dest != to) // graph 에서 목적지 빼고 넣어줌
            }
            path.push(to)
            console.log(path)
            dfs(to,_temp)
        })
        
    }
    dfs('ICN',graph)
    return answer[0]
}

console.log(solution(tickets))
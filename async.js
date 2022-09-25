/*
async와 await

이제는 정리하자!

async는 function앞에 위치한다.

그리고 반환하는 결과가 프러미스가 된다. 이게 끝?

반환값을 Promise.resolve로도 가능하다 그럼 Promise.reject로도되나? 안된다.

await문법은 async 함수 안에서만 동작한다.

*/

async function f() {
    let promise = new Promise((resolve,reject) => {
        setTimeout(() => resolve("완료!"),10000)
    });

    
    let result = await promise; //promise가 이행될 때가지 기다림
    console.log(result)
}

f()

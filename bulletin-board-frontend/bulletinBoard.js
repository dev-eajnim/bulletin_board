let selectedId = null;

// 전체 조회 (GET LIST)
async function getList(){
    const list = await fetch('http://localhost:3000/bulletin-board')
    .then(res=>res.json());

    const tableBody = document.querySelector('.boardListBody');
    tableBody.innerHTML = ''

    for(let l of list){
        const tr = document.createElement('tr');

        const d = new Date(l.date) //먼저 Date형식으로 바꿔줘야 아래거를 사용할 수 있음
        const date = d.toLocaleDateString()

        // <a href="detail.html?id=${l.id}"> 여기서 Query 값(id) 넘김!!
        tr.innerHTML=`
        <td>${l.id}</td>
        <td><a href="detail.html?id=${l.id}">${l.title}</td> 
        <td>${date}</td>
        <td>${l.views}</td>
        `;

        tableBody.append(tr)
        console.log(tr);
    }
}

// 쓰기(WRITE) 버튼
async function createlist(){
    const newTitle = document.querySelector('.modifyTitle').value;
    const newContent = document.querySelector('.modifyContent').value;

    const list = await fetch('http://localhost:3000/bulletin-board', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "title":newTitle,
            "content":newContent
            //작성일 - entity 데코레이션으로 해결
            //views ++ 해야함!! - entity 데코레이션으로 해결
        })
    }).then(()=>{ //return을 안해줘서 나도 res=> res.json() 안함 Do you understand?
        alert("새로 저장되었습니다");
    }).catch(()=>{
        alert("에러에러에러");
    })
    history.back(); //이전 페이지로 이동, 이동하면 알아서 다시 getList되서 리스트가 나옴
}

async function btnSave(){
    if(selectedId){
        // update함수
    }else{
        createlist();
    }
}
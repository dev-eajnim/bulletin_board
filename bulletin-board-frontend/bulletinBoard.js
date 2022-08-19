let selectedId = null;

// 전체 조회 (GET LIST)
async function getList() {
    const list = await fetch('http://localhost:3000/bulletin-board')
        .then(res => res.json());

    const tableBody = document.querySelector('.boardListBody');
    tableBody.innerHTML = ''

    for (let l of list) {
        const tr = document.createElement('tr');

        const d = new Date(l.date) //먼저 Date형식으로 바꿔줘야 아래거를 사용할 수 있음
        const date = d.toLocaleDateString()

        // <a href="detail.html?id=${l.id}"> 여기서 Query 값(id) 넘김!!
        tr.innerHTML = `
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
async function createlist() {
    const newTitle = document.querySelector('.modifyTitle').value;
    const newContent = document.querySelector('.modifyContent').value;

    const list = await fetch('http://localhost:3000/bulletin-board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "title": newTitle,
            "content": newContent
            //작성일 - entity 데코레이션으로 해결
            //views ++ 해야함!! - entity 데코레이션으로 해결
        })
    }).then(() => { //return을 안해줘서 나도 res=> res.json() 안함 Do you understand?
        alert("새로 저장되었습니다");
    }).catch(() => {
        alert("에러에러에러");
    })
    history.back(); //이전 페이지로 이동, 이동하면 알아서 다시 getList되서 리스트가 나옴
}

// 쓰기 >> "저장" 버튼
async function btnSave() {
    if (selectedId) {
        updatelist();
    } else {
        createlist();
    }
}

// 글 하나씩 보여주기 
async function getDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const li = await fetch(`http://localhost:3000/bulletin-board/${id}`
    ).then(res => res.json());

    //.value : input / innerText : 나머지
    document.querySelector('.detailTitle').innerText = li.title;
    document.querySelector('.detailContent').innerText = li.content;

    await updateViews(id)
}

// 세부사항 >> "삭제" 버튼
async function deleteDetail() {
    // 웹주소 다루는 기능
    // URLSearchParams : get요청시 데이터를 전달할때 사용
    // 물음표(?) 뒤에를 search로 접근함
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const li = await fetch(`http://localhost:3000/bulletin-board/${id}`, {
        method: 'DELETE'
    }).then(res => 
    alert('삭제되었습니다')
    ).catch(() => { alert("에러에러에러") });
    history.back();
}

// 세부사항 >> "수정" 후 "저장"
async function updatelist(){

    // 값 가져오기
    const modifyTitle = document.querySelector('.modifyTitle').value
    const modifyContent = document.querySelector('.modifyContent').value
    
    //삭제랑 비슷
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    await fetch(`http://localhost:3000/bulletin-board/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify({
            "title":modifyTitle,
            "content":modifyContent
        })
    }).then((res)=>{
        alert("할일이 수정되었습니다")
    }).catch(() => {
        alert("에러에러에러")
    })
    location.href='list.html'
}

// 세부사항 >> "수정" 버튼
async function btndetailUpdate(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const li = await fetch(`http://localhost:3000/bulletin-board/${id}`
    ).then((res)=> res.json());
    // (res) => res.json() //O
    // (res) => { return res.json() } //O
    // (res) => { res.json() } //X

    console.log(li)
    document.querySelector('.modifyTitle').value = li.title;
    document.querySelector('.modifyContent').value = li.content;
    
    selectedId = id;
}

function moveToModify() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    location.href = `modify.html?id=${id}`
}

async function updateViews(id) {
    // update views
    await fetch(`http://localhost:3000/bulletin-board/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify({
            "views": views++
        })
    }).then((res)=>res.json()
    ).catch(()=>alert("에러에러에러"));
    console.log(views);
}
async function getList(){
    const list = await fetch('http://localhost:3000/bulletin-board')
    .then(res=>res.json());

    const tableBody = document.querySelector('.boardListBody');
    tableBody.innerHTML = ''

    for(let l of list){
        const tr = document.createElement('tr');

        const d = new Date(l.date) //먼저 Date형식으로 바꿔줘야 함
        const date = d.toLocaleDateString()

        tr.innerHTML=`
        <td>${l.id}</td>
        <td><a href="detail.html">${l.title}</td>
        <td>${date}</td>
        <td>${l.views}</td>
        `;

        tableBody.append(tr)
        console.log(tr);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let dogTable = document.querySelector('#table-body');
    let form = document.querySelector('#dog-form');

    form.addEventListener('submit', e =>{
        e.preventDefault()
        let tableNodes = dogTable.childNodes;
        let configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: e.target[0].value,
                breed: e.target[1].value,
                sex: e.target[2].value
            })
        }
        fetch(`http://localhost:3000/dogs/${e.target.dogData}`, configObj)
        .then(resp => resp.json())
        .then(obj =>{
            console.log(obj)
            tableNodes.forEach(row =>{
                if (row.className === 'editing'){
                    row.childNodes[0].innerText = obj.name;
                    row.childNodes[1].innerText = obj.breed;
                    row.childNodes[2].innerText = obj.sex;
                    row.className = '';
                }
            })
        })
    })

    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(obj => {
        obj.forEach(dog => {
            dogTable.appendChild(makeDogTableListing(dog));
        })
    })
})

function makeDogTableListing(obj){
    let form = document.querySelector('#dog-form');
    let tr = document.createElement('tr');
            let name = document.createElement('td');
            let breed = document.createElement('td');
            let sex = document.createElement('td');
            let buttonHolder = document.createElement('td');
            let button = document.createElement('button');
            name.innerText = obj.name;
            breed.innerText = obj.breed;
            sex.innerText = obj.sex;
            button.innerText = 'Edit Dog';
            button.addEventListener('click', e =>{
                console.log(e)
                form.childNodes[1].value = obj.name;
                form.childNodes[3].value = obj.breed;
                form.childNodes[5].value = obj.sex;
                form.dogData = obj.id;
                e.target.parentNode.parentNode.className = 'editing'
                console.log(e.target.parentNode.parentNode.className)
            })
            buttonHolder.appendChild(button);
            tr.appendChild(name);
            tr.appendChild(breed);
            tr.appendChild(sex);
            tr.appendChild(buttonHolder);
            return tr;
}
const inputTag = document.querySelector('.input')
const sortBtn = document.querySelector('.button-sort')
const saveBtn = document.querySelector('.button-save')
const nameList = document.querySelector('.name__list')
const deleteBtn = document.querySelector('.button-delete')
let arrName = JSON.parse(localStorage.getItem('localList')) 


const showNames = () => {
    if (arrName) {
        arrName.forEach(({ name }, i) => {
            nameList.innerHTML += `<li> ${name}</li>`
        })
    }
}

function byField(field) {
    return(a, b) => a[field] > b[field] ? 1 : -1;
}

function byFieldRev(field) {
    return(a, b) => b[field] > a[field] ? 1 : -1;
}

sortBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.dataset.id == 1) {
        arrName.sort(byField('name'))
        event.target.dataset.id = 2
    } else {
        arrName.sort(byFieldRev('name'))
        event.target.dataset.id = 1
    }

    nameList.innerHTML = ''
    arrName.forEach(({ name }, i) => {
        nameList.innerHTML += `${i + 1} : ${name}<br>`
    }) 
})

saveBtn.addEventListener('click', (event) => {

    event.preventDefault()
    let nameValue = inputTag.value.toLowerCase().trim()

    if (nameValue) {

        if (!arrName) {
            arrName = []
        }

        let obj = { name:nameValue }
        const { name } = obj 
        arrName.push(obj)
        localStorage.setItem('localList', JSON.stringify(arrName))
        inputTag.value = ''
        nameList.innerHTML = ''
        showNames()

    } else {
        alert('Введите имя')
    }
})

deleteBtn.addEventListener('click',()=>{
  nameList.innerHTML=''
})



showNames()










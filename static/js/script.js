const input = document.querySelector('input[name="input-word"]')
const button = document.querySelector('button.search')

function updateOpenLinks() {
    const listLinks = document.querySelector('.list-links')
    console.log(Object.entries(localStorage))
    const array = Object.entries(localStorage)
    for(let i of array) {
        console.log(i)
        listLinks.innerHTML += `<a class="open-window" href="#">${i[0]}</a>`
    }
    const openWindowLinks = document.querySelectorAll('.open-window')
    for(let i of openWindowLinks){
        i.addEventListener('click', (eventOpenWindow) => { let newWindow = window.open('', '', 'popup')
        newWindow.document.body.innerHTML += localStorage.getItem(i.textContent)
    })
    }
}

updateOpenLinks()

console.log(input, button)

button.addEventListener('click', async(eventClickButtonSearch) => {
    eventClickButtonSearch.preventDefault()
    const word = input.value
    // console.log(word)

    let res = (await axios.post('/urls', {
    url: word
}))
console.log(res)
let data = res.data
console.log(data)

const listLinkSave = document.querySelector('.list-links-save')
listLinkSave.innerHTML = ''
for(let i of data) {
    console.log(i)
    listLinkSave.innerHTML += `<a class= "link-to-save" href="#">${i}</a>`
}
const saveLinks = document.querySelectorAll('.link-to-save')
for(let i of saveLinks){
    i.addEventListener('click', async(eventSaveLink) => {
        eventSaveLink.preventDefault()
        console.log(i.textContent)
        let res = await (axios.get(`/public/${i.textContent}`))
        let data = res.data
        console.log(data)
        localStorage.setItem(i.textContent, data)
        updateOpenLinks()
    })
}
console.log(saveLinks)
})


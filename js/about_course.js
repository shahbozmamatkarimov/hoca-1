let curses =  JSON.parse(localStorage.getItem('courses'))
// let title = document.querySelector('.title')
// let price = document.querySelector('.price')
// let type = document.querySelector('.type')

// title.innerHTML = curses.title
// price.innerHTML = curses.price
// type.innerHTML = curses.type
// img.src = `${curses.img}`    

let css_title = document.querySelectorAll('.css_title')
let python = document.querySelector('.python')
let css_titles = document.querySelector('.css_titles')
let css_price = document.querySelector('.css_price')
let css_type = document.querySelector('.css_type')
let css_img = document.querySelector('.css_img')
css_titles.innerHTML = `<b>title: </b> ${curses.title}`
css_price.innerHTML = `<b>price: </b> ${curses.price}`
css_type.innerHTML = `<b>type: </b> ${curses.type}`
python.innerHTML = `${curses.title} is a class-based, object-oriented programming language that is designed to have
as few implementation dependencies as possible.`
for(let i of css_title){
    i.innerHTML = curses.title
}
// css_price.innerHTML = curses.price
css_img.src = `${curses.img}`
// css_type.innerHTML = curses?.type

if(tegsearch.value){
    for(let i of curses){
        console.log(i, tegsearch.value);
        if(tegsearch.value == i){
            i.innerHTML = tegsearch.value
        }
    }
}

let local = JSON.parse(localStorage.getItem('courses_list'))
function createElement(...restData) {
    let store = [];
    for (let el of restData) {
        store.push(document.createElement(el))
    }
    return store;
}
console.log(local);
for (let i in local) {
    if (local[i].type == 'IOS') {
        let [a, div, h1, p, span, span1, img] = createElement('a', 'div', 'h1', 'p', "span", 'span', 'img');
        h1.innerHTML = local[i].title
        p.innerHTML = local[i].price
        span.innerHTML = local[i].type
        img.setAttribute('src', `${local[i].img}`)
        span1.append(img)
        div.append(p, h1, span, span1)
        h1.style.display = 'block';
        p.style.display = 'block';
        div.style.display = 'block';
        let x = Math.floor(Math.random() * 16777215).toString(16)
        div.style.background = `${'#' + x}`
        div.style.color = 'white'
        a.append(div)
        a.setAttribute('class', 'card')
        menu.append(a)
        a.onclick = () => {
            localStorage.setItem('courses', JSON.stringify(i))
            location.href = `./about_course.html`
        }
    }
}
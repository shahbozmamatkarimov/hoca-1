let local = JSON.parse(localStorage.getItem('objects'));
if (local) {
    for (let i of local) {
        i.email = atob(i.email)
        i.password = atob(i.password)
        i.name = atob(i.name)
        i.surname = atob(i.surname)
    }
}

let user1 = JSON.parse(localStorage.getItem('user1'));
if (user1) {
    topnav.innerHTML = `
    <h1>Programming</h1>
        <div class="place">
            <nav role="navigation" class="primary-navigation" id="navigatorid">
                <ul>
                    <li><a class="active" href="#home">Main menu</a></li>
                    <li><a href="#">courses</a>
                        <ul class="dropdown">
                            <li><a onclick="change1(this)">Web Development</a></li>
                            <li><a onclick="change2(this)">Web Design</a></li>
                            <li><a onclick="change3(this)">Web Technology</a></li>
                            <li><a onclick="change4(this)">IOS</a></li>
                            <li><a onclick="change5(this)">Design</a></li>
                        </ul>
                    </li>
                    <li><a href="#news" id="lists">About</a></li>
                    <li><a onclick="changes()">Log out</a></li>
                    <li class="label"><a><label for="mainsearch" id="label"><i class="fa fa-search"></i></label></a>
                    </li>
                </ul>
        </nav>
    `
}
let admin = JSON.parse(localStorage.getItem('admin'));
if (admin != null) {
    topnav.innerHTML = `
    <h1>Admin section</h1>
        <div class="place">
        <nav role="navigation" class="primary-navigation" id="navigatorid">
        <ul>
            <li><a class="active" href="#home">Main menu</a></li>
            <li><a href="#">courses</a>
                <ul class="dropdown">
                    <li><a onclick="change1(this)">Web Development</a></li>
                    <li><a onclick="change2(this)">Web Design</a></li>
                    <li><a onclick="change3(this)">Web Technology</a></li>
                    <li><a onclick="change4(this)">IOS</a></li>
                    <li><a onclick="change5(this)">Design</a></li>
                </ul>
            </li>
            <li><a href="#news" id="lists">About</a></li>
            <li><a href="html/course_list.html">Courses list</a></li>
            <li><a href="html/create_course.html">Create course</a></li>
            <li><a href="html/users_list.html">Users</a></li>
            <li><a onclick="changes()">Log out</a></li>
            <li class="label"><a><label for="mainsearch" id="label"><i class="fa fa-search"></i></label></a></li>
        </ul>
        </nav>
        </div>
        <input type="text" placeholder="Search" id="mainsearch" oninput="searchValue(this.value)">
    `
}

function changes() {
    let objects = JSON.parse(localStorage.getItem("objects"));
    localStorage.clear()
    localStorage.setItem("objects", JSON.stringify(objects));
    topnav.innerHTML = `
    <h1>Programming</h1>
        <div class="place">
            <a class="active" >Main menu</a>
            <a href="#news">About</a>
            <a href="html/login.html">Login</a>
            <a href="html/register.html">Register</a>
        </div>
    `
    local = null;
    main.style.display = 'none';
}

let div = document.createElement('div')
div.setAttribute('class', 'searchteg')
// mainsearch.after(div)
function searchValue(teg) {
    let cards = document.querySelectorAll('.card');
    let h1, txtValue;
    let filter1 = teg.toUpperCase();
    div.innerHTML = ''
    for (let i = 0; i < cards.length; i++) {
        h1 = cards[i].querySelector("h1");
        txtValue = h1.textContent || h1.innerText;
        if (txtValue.toUpperCase().indexOf(filter1) > -1) {
            let p = document.createElement('p');
            p.innerHTML = txtValue
            div.append(p)
            p.onclick = () => {
                mainsearch.value = p.innerHTML
                window.scrollTo(0, 500)
                for (let i of cards) {
                    h1 = i.querySelector("h1");
                    i.style.display = 'none';
                    if (h1.innerHTML == p.innerHTML) {
                        i.style.display = "block";
                    }
                }
            }
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = "none";
        }
        if (txtValue == '') {
            cards.style.display = 'block';
        }
    }

}

if (local != null) {
    label.onclick = function () {
        if (mainsearch.style.display == 'none') {
            mainsearch.value = '';
            mainsearch.style.display = 'inline-block';
        } else {
            mainsearch.value = '';
            mainsearch.style.display = 'none';
        }
    }
    let colors = ['black', 'red', 'green', 'orange', 'blue', 'purple', 'aqua', 'pink', 'yellow', 'grey']
    let s = 0
    function createElement(...restData) {
        let store = [];
        for (let el of restData) {
            store.push(document.createElement(el))
        }
        return store;
    }

    let courses = JSON.parse(localStorage.getItem('courses_list'));
    if (courses) {
        for (let i of courses) {
            let [a, div, h1, p, span, span1, img] = createElement('a', 'div', 'h1', 'p', "span", 'span', 'img');
            h1.innerHTML = i.title
            p.innerHTML = i.price
            span.innerHTML = i.type
            img.setAttribute('src', `${i.img}`)
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
                location.href = `html/about_course.html`
            }
            s += 1
        }
    }
    let animate = document.querySelectorAll('#menu div')
    for (let i of animate) {
        setTimeout(() => {
            i.addEventListener('mouseover', () => {
                i.style.boxShadow = 'none'
            })
        }, 1000)
    }
    for (let i of animate) {
        setTimeout(() => {
            i.addEventListener('mouseleave', () => {
                i.style.boxShadow = '10px 10px 10px grey'
            })
        }, 1000)
    }

} else {
    topnav.innerHTML = `
    <h1>Programming</h1>
        <div class="place">
            <a class="active">Main menu</a>
            <a href="#news">About</a>
            <a href="html/login.html">Login</a>
            <a href="html/register.html">Register</a>
        </div>
    `
}
function change1(val) {
    location.href = "html/webDevelopment.html"
}

function change2(val) {
    location.href = 'html/webDesign.html'
}

function change3(val) {
    location.href = 'html/webTechnology.html'
}

function change4(val) {
    location.href = 'html/IOS.html'
}

function change5(val) {
    location.href = 'html/design.html'
}

let course = (localStorage.getItem('courses_list'))
let blob = new Blob([JSON.stringify(course)], { type: 'text/json' })
function but1() {
    download1.href = URL.createObjectURL(blob)
}
function but2() {
    download2.href = URL.createObjectURL(blob)
}
function but3() {
    download3.href = URL.createObjectURL(blob)
}
function but4() {
    download4.href = URL.createObjectURL(blob)
}

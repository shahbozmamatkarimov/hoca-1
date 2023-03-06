let courses = JSON.parse(localStorage.getItem('courses_list'));
let titlec = '', pricec = '', typec = 'Web development', imgc = '', bool = false;
let idc
for(let i of courses){
    if(i.id){
        console.log(i.id);
        idc = i.id
        console.log(idc);
    }
}
function title1(val) {
    titlec = val;
}

function price1(val) {
    pricec = val;
}

function type1(val) {
    typec = val;
}

function img1(val) {
    imgc = val;
}
function button1() {
    if (titlec == '' || titlec == null) {
        title.setAttribute('placeholder', 'Enter title')
        title.style = 'background-color: red;'
        setTimeout(() => {
            title.style = 'background-color: white; color: black;'
        }, 1000)
    } else {
        if (pricec == '' || pricec == null) {
            price.setAttribute('placeholder', 'Enter price')
            price.style = 'background-color: red;'
            setTimeout(() => {
                price.style = 'background-color: white; color: black;'
            }, 1000)
        } else {
            if (imgc == '' || imgc == null) {
                img.setAttribute('placeholder', 'Enter img URL')
                img.style = 'background-color: red;'
                setTimeout(() => {
                    img.style = 'background-color: white; color: black;'
                }, 1000)
            } else {
                bool = true
            }
        }
    }
    
    if(bool){
        let arr = {}
        arr.id = idc + 1;
        arr.img = imgc;
        arr.price = pricec;
        arr.title = titlec;
        arr.type = typec;
        courses.push(arr);
        localStorage.setItem('courses_list', JSON.stringify(courses));
        location.reload();
    }
}

let table = document.querySelectorAll('.menu');
for(let i of table){
    i.addEventListener('mouseover', function(){
        location.reload();
    })
}
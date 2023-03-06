// let arr = require('./edit_card');
let main = document.querySelector('.main')
let local = JSON.parse(localStorage.getItem('courses_list'))
for (let i of local) {
    let div = document.createElement('div')
    div.innerHTML = `
                <table>
                    <tr>
                        <td class="id">${i.id}</td>
                        <td class="title">${i.title}</td>
                        <td class="price">${i.price}</td>
                        <td class="type">${i.type}</td>
                        <td class="img"><img src="${i.img}" alt='img'></td>
                        <td class="action"><i class="fa fa-edit" onclick="edit1(this)"><b>${i.id}</b></i> <i class="fa fa-trash" onclick="change(this)"><b>${i.id}</b></i></td>
                    </tr>
                </table>
                `
    main.append(div)
    function change(val) {
        let b = val.querySelector("b");
        let x = confirm('Do you want to delete?')
        if (x) {

            local.forEach((c, index) => {
                if (c.id == b.innerHTML) {
                    local.splice(index, 1)
                }
            })
            localStorage.setItem('courses_list', JSON.stringify(local));
            location.reload()
        }
    }

    let bool = false
    function edit1(val) {

        let arr = {};
        let b = val.querySelector("b");
        local.forEach((c, index) => {
            if (c.id == b.innerHTML) {
                for (let i in c) {
                    arr[`${i}`] = c[i];
                }
            }
        })
        localStorage.setItem('edit_card', JSON.stringify(arr))
        localStorage.setItem('courses_list', JSON.stringify(local));
        window.open("../html/edit_card.html","", 'width=500, height=600, top=100, left=550');
    }
}


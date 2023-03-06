let courses = JSON.parse(localStorage.getItem('courses_list'));
let edit_card = JSON.parse(localStorage.getItem('edit_card'));
        let titlec = '', pricec = '', typec = 'Web development', imgc = '', bool = false;
        title.placeholder = edit_card.title
        img.placeholder = edit_card.img
        price.placeholder = edit_card.price
        type.value = edit_card.type
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
                title.style = 'background-color: red;'
                setTimeout(() => {
                    title.style = 'background-color: white; color: black;'
                }, 1000)
            } else {
                if (pricec == '' || pricec == null) {
                    price.style = 'background-color: red;'
                    setTimeout(() => {
                        price.style = 'background-color: white; color: black;'
                    }, 1000)
                } else {
                    if (imgc == '' || imgc == null) {
                        img.style = 'background-color: red;'
                        setTimeout(() => {
                            img.style = 'background-color: white; color: black;'
                        }, 1000)
                    } else {
                        bool = true
                        edit_card.title = titlec
                        edit_card.price = pricec
                        edit_card.img = imgc
                        edit_card.type = typec
                        localStorage.setItem('edit_card', JSON.stringify(edit_card))
                        for(let i in courses){
                            if(edit_card.id == courses[i].id){
                                courses[i] = edit_card
                            }
                        }
                        localStorage.setItem('courses_list', JSON.stringify(courses))
                        if (bool) {
                            window.close()
                        }

                        
                    }
                }
            }
        }
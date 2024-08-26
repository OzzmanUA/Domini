
        let horizontScroll = document.querySelector('.container-gayds');
        let leftBtn = document.getElementById('leftBtn');
        let rightBtn = document.getElementById('rightBtn');

        rightBtn.addEventListener('click', ()=> {
            horizontScroll.style.scrollBehavior = "smooth";
            horizontScroll.scrollLeft += 520;
        })
        leftBtn.addEventListener('click', ()=> {
            horizontScroll.style.scrollBehavior = "smooth";
            horizontScroll.scrollLeft -= 520;
        })

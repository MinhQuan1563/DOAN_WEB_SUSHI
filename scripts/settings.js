// Lựa chọn các item trên nav-item
const navItems = document.querySelectorAll('.nav-item');
const sectionItems = document.querySelectorAll('.section > div');

navItems.forEach(function(navItem, index) {
    navItem.onclick = function() {
        document.querySelector('.nav-item.active').classList.remove('active');
        navItem.classList.add('active');

        sectionItems.forEach(function(sectionItem) {
            sectionItem.style.display = 'none';
        })

        switch(index) {
            case 0:
                document.querySelector('.section__home').style.display = "block";
                break;
            case 1:
                document.querySelector('.section__product').style.display = "block";
                break;
            case 2:
                document.querySelector('.section__order').style.display = "block";
                break;
            case 3:
                document.querySelector('.section__customer').style.display = "block";
                break;
            case 4:
                window.location.pathname = '/html/index.html';
                break;
        }
    }
})
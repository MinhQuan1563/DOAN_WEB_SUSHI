import {products} from "./json.js"

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sidebarItems = $$('.sidebar__menu-item');
const sectionItems = $$('.section__header-menu li');
const sectionActive = $('.section__header-menu li.active');
const productList = $('.section__content-list');
const pagi = $('#pagination');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const scrollToTop = $('#scroll-to-top');

// Xử lý thay đổi URL
function sidebarControl() {
    sidebarItems.forEach(function(sidebarItem, index) {
        sidebarItem.onclick = function() {
            switch(index) {
                case 0:
                    window.location.pathname = "/html/home.html";
                    break;
                case 1:
                    window.location.pathname = "/html/food.html";
                    break;
                case 2:
                    window.location.pathname = "/html/checkout.html";
                    break;
                case 3:
                    window.location.pathname = "/html/location.html";
                    break;
                case 4:
                    window.location.pathname = "/html/settings.html";
                    break;
            }
        }
    })
    renderProduct(products[0]);
}

// Xử lý render sản phẩm ra màn hình
function renderProduct(items) {
    const htmls = items.map((item, index) => {
        if(index >= start1 && index < end) {
            return `
        <li class="section__content-item">
            <div class="section__content-item-img" style="background-image: url('${item.image}');"></div>
            <div class="section__content-item-text">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <i class="eye-icon ti-eye" style="display: none;"></i>
        </li>`
        }
    });

    productList.innerHTML = htmls.join('');
}

// Xử lý phân trang
var perPage = 8;
var curPage = 1;
var start1 = 0;
var end = perPage;
var totalPage = Math.ceil(perPage / products[0].length) + 1;

function PagiHandle() {
    btnNext.onclick = function() {
        curPage++;
        if(curPage > totalPage) {
            curPage = totalPage;
        }

        start1 = (curPage - 1) * perPage;
        end = curPage * perPage;

        renderProduct(products[0]);
    }

    btnPrev.onclick = function() {
        curPage--;
        if(curPage <= 1) {
            curPage = 1 ;
        }
        start1 = (curPage - 1) * perPage;
        end = curPage * perPage;

        renderProduct(products[0]);
    }
}

// Xử lý di chuột qua danh sách các sản phẩm
function productHandle() {
    var productItems = $$('.section__content-item');
    var sectionImages = $$('.section__content-item-img');
    var details = $$('.eye-icon');
    
    productItems.forEach((item, index) => {
        sectionImages[index].style.transition = 'all linear 0.3s';
        item.onmouseover = () => {
            sectionImages[index].style.backgroundSize = '110%';
            details[index].style.display = 'block';
        }
        item.onmouseout = () => {
            sectionImages[index].style.backgroundSize = '100%';
            details[index].style.display = 'none';
        }
    })
}

// Điều khiển nút bấm trên Section
function sectionControl(list) {
    list.forEach((item, index) => {
        item.onclick = () => {
            $('.section__header-menu li.active').classList.remove('active')
            item.classList.add('active')
    
            renderProduct(products[index]);
            PagiHandle();
            productHandle();
        }
    })
    
}

function start() {
    sidebarControl();
    sectionControl(sectionItems);
    productHandle();
    PagiHandle(products[0]);
}

// ** Scroll to top
// Khi người dùng cuộn chuột thì gọi hàm scrollFunction
window.onscroll = function() {scrollFunction()};
// khai báo hàm scrollFunction
function scrollFunction() {
    // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        //nếu lớn hơn 200px thì hiện button
        scrollToTop.style.display = "block";
    } else {
        //nếu nhỏ hơn 200px thì ẩn button
        scrollToTop.style.display = "none";
    }
}
//gán sự kiện click cho button
scrollToTop.addEventListener("click", function(){
    //Nếu button được click thì nhảy về đầu trang
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

start();
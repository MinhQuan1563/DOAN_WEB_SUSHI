import {products} from "./json.js"

const sidebarItems = document.querySelectorAll('.sidebar__menu-item');
const sectionItems = document.querySelectorAll('.section__header-menu li');
const productList = document.querySelector('.section__content-list');
const pagi = document.getElementById('pagination');
const scrollToTop = document.getElementById('scroll-to-top');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const pageNum = document.querySelector('.pagi-number-page');

// ** Xử lý thay đổi URL trên sidebar
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

// ** Xử lý render sản phẩm ra màn hình
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

// ** Xử lý di chuột qua các sản phẩm trong danh sách
function productHandle() {
    var productItems = document.querySelectorAll('.section__content-item');
    var sectionImages = document.querySelectorAll('.section__content-item-img');
    var details = document.querySelectorAll('.eye-icon');
    
    productItems.forEach((item, index) => {
        sectionImages[index].style.transition = 'all linear 0.3s'; // cho các hành động mượt hơn
        item.onmouseover = () => {
            sectionImages[index].style.backgroundSize = '110%'; // Zoom to nhỏ hình ảnh sản phẩm
            details[index].style.display = 'block'; // Ẩn hiện con mắt
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

            getCurrentPage(1);

            document.querySelector('.section__header-menu li.active').classList.remove('active')
            item.classList.add('active')
            
            renderProduct(products[index]);
            productHandle();

            if(products[index].length > 8) {
                pagi.style.display = "flex";
                PagiHandle(index);
                renderNumPage();
            }
            else {
                pagi.style.display = "none";
            }
            changeNumPage(index);
        }
    })
    
}

// ** Xử lý phân trang
var perPage = 8; // Số sản phẩm tối đa trong 1 trang
var curPage = 1; // Trang hiện tại 
var start1 = 0; // index sản phẩm đầu
var end = perPage; // index sản phẩm cuối
var totalPage;

// Lấy ra trang hiện tại
function getCurrentPage(curPage) {
    start1 = (curPage - 1) * perPage;
    end = curPage * perPage;
}

function PagiHandle(index) {
    totalPage = Math.ceil(products[index].length / perPage); // Tổng số trang của 1 loại sp
    // Ấn next tới trang tiếp theo
    btnNext.onclick = function() {
        curPage++;
        if(curPage >= totalPage) {
            curPage = totalPage;
            btnNext.classList.remove('active');
            btnPrev.classList.add('active');
        }
        else {
            btnNext.classList.add('active');
            btnPrev.classList.add('active');
        }
        document.querySelector('.pagi-number-page li.active').classList.remove('active');
        document.querySelectorAll('.pagi-number-page li')[curPage - 1].classList.add('active');
        getCurrentPage(curPage);
        renderProduct(products[index]);
        productHandle();
    }
    // Ấn prev tới trang trước đó
    btnPrev.onclick = function() {
        curPage--;
        if(curPage <= 1) {
            curPage = 1 ;
            btnNext.classList.add('active');
            btnPrev.classList.remove('active');
        }
        else {
            btnNext.classList.add('active');
            btnPrev.classList.add('active');
        }
        document.querySelector('.pagi-number-page li.active').classList.remove('active');
        document.querySelectorAll('.pagi-number-page li')[curPage - 1].classList.add('active');
        getCurrentPage(curPage);
        renderProduct(products[index]);
        productHandle();
    }
}

// Xử lý hiện số trang ra màn hình
function renderNumPage() {
    var html = '';
    html += `
        <li class="active">${1}</li>`;

    for(let i=2; i <= totalPage; i++) {
        html += `
        <li>${i}</li>`;
    }
    pageNum.innerHTML = html;
}

// Xử lý thay đổi số trang
function changeNumPage(index) {
    var numPages = document.querySelectorAll('.pagi-number-page li');
    for(let i=0; i < numPages.length; i++) {
        numPages[i].onclick = function() {
            document.querySelector('.pagi-number-page li.active').classList.remove('active');
            numPages[i].classList.add('active');
            let value = i + 1;
            curPage = value;
            getCurrentPage(curPage);
            renderProduct(products[index]);
            productHandle();
        }
    }
}

// ** Xử lý cuộn lên trang đầu
function scrollTopHandle() {
    window.onscroll = function() {
        // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            //nếu lớn hơn 200px thì hiện button
            scrollToTop.style.display = "block";
        } else {
            //nếu nhỏ hơn 200px thì ẩn button
            scrollToTop.style.display = "none";
        }
    };
    //gán sự kiện click cho button
    scrollToTop.addEventListener("click", function(){
        //Nếu button được click thì nhảy về đầu trang
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}



// ==> Gọi các hàm để thực hiện xử lý
sidebarControl();
sectionControl(sectionItems);
productHandle();
scrollTopHandle();
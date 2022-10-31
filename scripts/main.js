import {products} from "./json.js"

const sectionItems = document.querySelectorAll('.section__header-menu li');
const productList = document.querySelector('.section__content-list');
const pagi = document.getElementById('pagination');
const scrollToTop = document.getElementById('scroll-to-top');

const pageNum = document.querySelector('.pagi-number-page');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

// ** Xử lý thay đổi URL trên sidebar
const sidebarItems = document.querySelectorAll('.sidebar__menu-item');
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
function productHandle(k) {
    var productItems = document.querySelectorAll('.section__content-item');
    var sectionImages = document.querySelectorAll('.section__content-item-img');
    var closeDetail = document.querySelector('.modal > i.close-icon');

    var details = document.querySelectorAll('.eye-icon');
    
    productItems.forEach((item, index) => {
        sectionImages[index].style.transition = 'all linear 0.3s'; // cho các hành động mượt hơn
        item.onmouseover = function() {
            sectionImages[index].style.backgroundSize = '110%'; // Zoom to nhỏ hình ảnh sản phẩm
            details[index].style.display = 'block'; // Ẩn hiện con mắt
        }
        item.onmouseout = function() {
            sectionImages[index].style.backgroundSize = '100%';
            details[index].style.display = 'none';
        }

        details[index].onclick = function() {
            document.querySelector('.modal__inner-img').style.backgroundImage = `url(${products[k][index + perPage*(curPage-1)].image})`;
            document.querySelector('.modal__inner-heading').innerText = products[k][index + perPage*(curPage-1)].name;
            document.querySelector('.modal__inner-price').innerText = products[k][index + perPage*(curPage-1)].price;
            overlay.classList.add('open');
        }

        overlay.onclick = function() {
            quantity.value = 1;
            overlay.classList.remove('open');
        }

        closeDetail.onclick = function() {
            quantity.value = 1;
            overlay.classList.remove('open');
        }

        modal.onclick = function(e) {
            e.stopPropagation();
        }
    })
}

// Điều khiển nút bấm trên Section
function sectionControl(list) {
    list.forEach((item, index) => {
        item.onclick = function() {

            pageDefault();

            document.querySelector('.section__header-menu li.active').classList.remove('active')
            item.classList.add('active')
            
            renderProduct(products[index]);
            productHandle(index);

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

const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
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
        productHandle(index);
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
        productHandle(index);
    }
}

// Xử lý hiện số trang ra màn hình
function renderNumPage() {
    var html = '';
    html += `<li class="active">${1}</li>`;

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

            if(i == 0) {
                btnNext.classList.add('active');
                btnPrev.classList.remove('active');
            }
            else if(i == numPages.length - 1) {
                btnNext.classList.remove('active');
                btnPrev.classList.add('active');
            }
            else {
                btnNext.classList.add('active');
                btnPrev.classList.add('active');
            }

            let value = i + 1;
            curPage = value;
            getCurrentPage(curPage);
            renderProduct(products[index]);
            productHandle(index);

        }
    }
}

// Trang mặc định ban đầu
function pageDefault() {
    getCurrentPage(1);
    curPage = 1;
    btnNext.classList.add('active');
    btnPrev.classList.remove('active');
}

// ** Xử lý ẩn/hiện form Đăng ký/Đăng nhập
const loginBtn = document.getElementById('section__header-login');
const overlayLogin = document.querySelector('.overlay.login');
const modalLogin = document.querySelector('.modal.login');
const closeLogin = document.querySelectorAll('.close-icon.login');
const signupBtn = document.querySelector('.wrapper__not-account span');
const formSignup = document.querySelector('.sign-up');
const formSignin = document.querySelector('.sign-in');
const loginBack = document.querySelector('.login-back-icon');

loginBtn.onclick = function() {
    formSignup.style.display = 'none';
    formSignin.style.display = 'block';
    overlayLogin.classList.add('open');
}

for(let i = 0; i < closeLogin.length; i++) {
    closeLogin[i].onclick = function() {
        overlayLogin.classList.remove('open');
    }
}

overlayLogin.onclick = function() {
    overlayLogin.classList.remove('open');
}

modalLogin.onclick = function(e) {
    e.stopPropagation();
}

signupBtn.onclick = function() {
    formSignup.style.display = 'block';
    formSignin.style.display = 'none';
}

loginBack.onclick = function() {
    formSignup.style.display = 'none';
    formSignin.style.display = 'block';
}

// ** Xử lý lưu dữ liệu trên form Đăng ký/Đăng nhập
const loginUsername = document.getElementById('username');
const loginEmail = document.getElementById('email');
const loginpassword = document.getElementById('password');
const loginAgainPassword = document.getElementById('again-password');
const overlayNotify = document.querySelector('.overlay-notify');
const loginNotify = document.querySelector('.login-notify');

function addLogin() {
    var arrLogin = [];
    var Name = loginUsername.value;
    var email = loginEmail.value;
    var password = loginpassword.value;
    arrLogin = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : [];
    var User = {
        Name: Name,
        Email: email,
        Password: password
    }
    arrLogin.push(User);
    localStorage.setItem('login', JSON.stringify(arrLogin));
    clear();
}

// Kiểm tra đăng nhập
function checkSignin() {
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    const arr = JSON.parse(localStorage.getItem('login'));
    for (let i = 0; i < arr.length; i++) {
        if (Email == arr[i].Email && Password == arr[i].Password) {
            return true;
        }
    }
    return false;
}

function clear() {
    loginUsername.value = "";
    loginEmail.value = "";
    loginpassword.value = "";
    loginAgainPassword.value = "";
}

document.getElementById('login-btn').onclick = function() {
    setTimeout(function() {
        addLogin();
        overlayNotify.style.transform = 'translateX(0)';
        overlayNotify.style.opacity = '1';
        overlayNotify.innerHTML = `<div class="login-notify success">
                                        <i class="fa-solid fa-circle-check"></i>
                                        Đăng ký thành công
                                    </div>`;
    }, 500)
    
    setTimeout(function() {
        overlayNotify.style.transform = 'translateX(100%)';
        overlayNotify.style.opacity = '0';
        formSignup.style.display = 'none';
        formSignin.style.display = 'block';
    }, 2000)
}

document.getElementById('Login-Btn').onclick = function() {
    if(checkSignin()) {
        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(0)';
            overlayNotify.style.opacity = '1';
            overlayNotify.innerHTML = `<div class="login-notify success">
                                        <i class="fa-solid fa-circle-check"></i>
                                        Đăng nhập thành công
                                    </div>`;
        }, 500)

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(100%)';
            overlayNotify.style.opacity = '0';
            overlayLogin.classList.remove('open');
        }, 2000)
    }
    else {
        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(0)';
            overlayNotify.style.opacity = '1';
            overlayNotify.innerHTML = `<div class="login-notify error">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                        Đăng nhập thất bại!!
                                    </div>`;
        }, 500)

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(100%)';
            overlayNotify.style.opacity = '0';
            document.getElementById('Email').value = "";
            document.getElementById('Password').value = "";
        }, 2000)
    }
}

// ** Xử lý cuộn lên trang đầu
function scrollTopHandle() {
    window.onscroll = function() {
        // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            //nếu lớn hơn 200px thì hiện button
            scrollToTop.style.display = "block";
        }
        else {
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

// ** Xử lý tăng giảm số lượng
const amountBtns = document.querySelectorAll(".modal__inner-amount input[type='button']");
var quantity = document.querySelector(".modal__inner-amount input[type='text']");

amountBtns.forEach((amountBtn, index) => {
    amountBtn.onclick = function() {
        if(index == 0) {
            if(quantity.value == 1) {
                quantity.value = 1;
            }
            else {
                quantity.value--;
            }
        }
        else {
            quantity.value++;
        }
    }
})

// ** Check lỗi login


// ==> Gọi các hàm để thực hiện xử lý
sidebarControl();
sectionControl(sectionItems);
productHandle(0);
scrollTopHandle();

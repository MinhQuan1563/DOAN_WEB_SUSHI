import {products} from "./json.js"

const sectionItems = document.querySelectorAll('.section__header-menu li');
const productList = document.querySelector('.section__content-list');
const pagi = document.getElementById('pagination');
const scrollToTop = document.getElementById('scroll-to-top');

const pageNum = document.querySelector('.pagi-number-page');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const sectionContents = document.querySelectorAll('.section__content');

// ** Xử lý thay đổi URL trên sidebar
const sidebarItems = document.querySelectorAll('.sidebar__menu-item');
function sidebarControl() {
    sidebarItems.forEach(function(sidebarItem, index) {
        sidebarItem.onclick = function() {
            document.querySelector('.sidebar__menu-item.active').classList.remove('active');
            sidebarItem.classList.add('active');

            sectionContents.forEach(function(sectionContent) {
                sectionContent.style.display = 'none';
            })
            document.querySelector('.section__header-menu').style.display = "none";

            switch(index) {
                case 0:
                    document.querySelector('.section__content.home').style.display = "block";
                    break;
                case 1:
                    document.querySelector('.section__content.food').style.display = "block";
                    document.querySelector('.section__header-menu').style.display = "flex";
                    break;
                case 2:
                    document.querySelector('.section__content.checkout').style.display = "block";
                    break;
                case 3:
                    document.querySelector('.section__contact.section__contact').style.display = "flex";
                    break;
                // case 4:
                //     window.location.pathname = "/html/settings.html";
                //     break;
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
    var closeDetail = document.querySelectorAll('.modal > i.close-icon');

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

function openFormLogin() {
    loginBtn.onclick = function() {
        const arr = JSON.parse(localStorage.getItem('accountStorage'));
        if(arr[0].isAdmin == false && arr[0].isUser == false) {
            formSignup.style.display = 'none';
            formSignin.style.display = 'block';
            overlayLogin.classList.add('open');
        }
    }
}

function closeFormLogin() {
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
}

signupBtn.onclick = function() {
    formSignup.style.display = 'block';
    formSignin.style.display = 'none';
}

loginBack.onclick = function() {
    formSignup.style.display = 'none';
    formSignin.style.display = 'block';
}

openFormLogin();
closeFormLogin();

// ** Xử lý lưu dữ liệu trên form Đăng ký/Đăng nhập
const loginUsername = document.getElementById('username');
const loginEmail = document.getElementById('email');
const loginpassword = document.getElementById('password');
const loginAgainPassword = document.getElementById('again-password');
const overlayNotify = document.querySelector('.overlay-notify');

var accounts = [];

function setDefaultAccount() {
    accounts = [
        {
            isAdmin: false,
            isUser: false,
            isLogout: true
        },
        {
            Name: 'user',
            Email: 'user',
            Password: 'user'
        }
    ];
    
    localStorage.setItem("accountStorage", JSON.stringify(accounts));
}

function addLogin() {
    var Name = loginUsername.value;
    var email = loginEmail.value;
    var password = loginpassword.value;
    var arr = localStorage.getItem('accountStorage') ? JSON.parse(localStorage.getItem('accountStorage')) : [];
    var User = {
        Name: Name,
        Email: email,
        Password: password
    }
    arr.push(User);
    localStorage.setItem('accountStorage', JSON.stringify(arr));
    clear();
}

// Kiểm tra đăng nhập Người dùng bình thường
function checkSignin() {
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    const arr = JSON.parse(localStorage.getItem('accountStorage'));
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].Email == Email && arr[i].Password == Password) {
            arr[1].Name = arr[i].Name;
            arr[1].Email = arr[i].Email;
            arr[1].Password = arr[i].Password;
            localStorage.setItem('accountStorage', JSON.stringify(arr));
            return true;
        }
    }

    return false;
}

// Kiểm tra đăng nhập Người dùng là Admin
function checkAdmin() {
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    const arr = JSON.parse(localStorage.getItem('accountStorage'));
    for(let i = 0; i < arr.length; i++) {
        if (Email == "admin" && Password == "admin") {
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
    const arr = JSON.parse(localStorage.getItem('accountStorage'));
    if(checkAdmin()) {
        arr[0].isAdmin = true;
        arr[0].isUser = false;
        arr[0].isLogout = false;

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(0)';
            overlayNotify.style.opacity = '1';
            overlayNotify.innerHTML = `<div class="login-notify success">
                                        <i class="fa-solid fa-circle-check"></i>
                                        Đăng nhập thành công
                                    </div>`;
            checkAccount();
        }, 500)

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(100%)';
            overlayNotify.style.opacity = '0';
            overlayLogin.classList.remove('open');
        }, 2000)

    }
    else if(checkSignin()) {
        arr[0].isUser = true;
        arr[0].isAdmin = false;
        arr[0].isLogout = false;

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(0)';
            overlayNotify.style.opacity = '1';
            overlayNotify.innerHTML = `<div class="login-notify success">
                                        <i class="fa-solid fa-circle-check"></i>
                                        Đăng nhập thành công
                                    </div>`;
            checkSignin();                        
            checkAccount();
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

    localStorage.setItem('accountStorage',JSON.stringify(arr))
}

// Kiểm tra tài khoản đã có hay chưa
function checkAccount() {
    const arr = JSON.parse(localStorage.getItem("accountStorage"));

    if(arr == null ) {
        setDefaultAccount();
    }
    else {
        if(arr[0].isAdmin == false && arr[0].isUser == false) {
            openFormLogin();
        }
        else {
            if(arr[0].isAdmin == true) {
                document.querySelector('.sidebar__menu-item:last-child').classList.remove('hide');
                document.querySelector('.section__header-title-text.login').innerText = 'Admin';
            }
            else if(arr[0].isUser == true) {
                document.querySelector('.section__header-title-text.login').innerText = arr[1].Name;
            }

            document.querySelector('.sidebar__log-out').classList.remove('hide');
            document.getElementById('section__header-login').style.color = 'white';
            document.getElementById('section__header-login').style.cursor = 'default';
        }

        localStorage.setItem('accountStorage',JSON.stringify(arr));
    }   
}

// Xử lý khi ấn vào nút Log out
const logout = document.querySelector('.sidebar__log-out');
const notify = document.querySelector('.notify'); 

function checkLogout() {
    logout.onclick = function() {
        const arr = JSON.parse(localStorage.getItem("accountStorage"));

        arr[0].isLogout = true;
        arr[0].isAdmin = false;
        arr[0].isUser = false;

        setTimeout(function() {
            notify.style.transform = 'translateX(0)';
            notify.style.opacity = '1';
            notify.innerHTML = `<div class="inner-notify success">
                                    <i class="fa-solid fa-person-running"></i>
                                    Đăng xuất thành công
                                </div>`;
        }, 500)
        
        setTimeout(function() {
            notify.style.transform = 'translateX(100%)';
            notify.style.opacity = '0';
        }, 1500)

        document.querySelector('.section__header-title-text.login').innerHTML = 'Đăng ký <br> Đăng nhập';
        document.querySelector('.sidebar__log-out').classList.add('hide');
        localStorage.setItem('accountStorage',JSON.stringify(arr));

        setTimeout(function() {
            window.location.pathname = "/html/index.html";
        }, 2000)
    }
}

checkLogout();

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


// ** tìm kiếm sản phẩm
// const search = document.querySelector('#section__search');
// const itemsContainer = document.querySelector('.section__content-list');
// const pagination = document.querySelector('#pagination');
// const clearSearch = document.querySelector('.section__delete');
// const itemsprodust = itemsContainer.querySelectorAll('.section__content-item');
// Array.from(itemsprodust).forEach(function(item) {
//     item.addEventListener('mouseenter', scaleOut);
//     item.addEventListener('mouseleave', scaleIn);
// });

// function scaleOut(e) {
//     e.target.style.transform = 'scale(1.05)'
//     e.target.style.transition = `0.7s`
// }

// function scaleIn(e) {
//     e.target.style.transform = 'scale(1)'
//     e.target.style.transition = `0.7s`
// }
// //Search input events 
// search.addEventListener('input', searchEvent);

// function searchEvent(e) {
//     //hiển thị nút xóa input tìm kiếm
//     if (e.target.value.length > 0) {
//         clearSearch.style.display = 'block';
//         pagination.style.display = 'none';
//     } else {
//         clearSearch.style.display = 'none';
//         location.reload();
//     }
//     const text = e.target.value.toLowerCase();
//     const items = itemsContainer.querySelectorAll('.section__content-item');
//     Array.from(items).forEach(function(item) {
//         const ListItems = item.children[1].textContent;
//         if (ListItems.toLocaleLowerCase().indexOf(text) != -1) {
//             item.style.display = 'block';
//         } else {
//             item.style.display = 'none';
//         }
//     })
// }

// //Xóa sự kiện Search
// clearSearch.addEventListener('click', deleteEvent);

// function deleteEvent(e) {
//     search.value = '';
//     e.target.style.display = 'none';
//     //load lại web
//     location.reload();
// }

// ==> Gọi các hàm để thực hiện xử lý
sidebarControl();
sectionControl(sectionItems);
productHandle(0);
scrollTopHandle();
checkAccount();

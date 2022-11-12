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

            switch(index) {
                case 0:
                    document.querySelector('.section__content.home').style.display = "block";
                    break;
                case 1:
                    document.querySelector('.section__content.food').style.display = "block";
                    break;
                case 2:
                    document.querySelector('.section__content.checkout').style.display = "block";
                    break;
                case 3:
                    document.querySelector('.section__contact.section__contact').style.display = "flex";
                    break;
                case 4:
                    window.location.pathname = '/html/settings.html';
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

function openFormLogin() {
    loginBtn.onclick = function() {
        const arr = JSON.parse(localStorage.getItem('account'));
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
const loginFullname = document.getElementById('fullname');
const loginUsername = document.getElementById('username');
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
            Fullname: 'user',
            Username: 'user',
            Password: 'user'
        }
    ];
    
    localStorage.setItem("account", JSON.stringify(accounts));
}

loginFullname.onblur = function() {
    var fullname = loginFullname.value;
    checkFullname(fullname, 2);
}

loginUsername.onblur = function() {
    var username = loginUsername.value;
    checkUsername(username, 3);
}

loginpassword.addEventListener('blur', function() {
    var password = loginpassword.value;
    checkPassword(password, 4);
})

loginAgainPassword.addEventListener('blur', function() {
    var againPassword = loginAgainPassword.value;
    var password = loginpassword.value;
    checkAgainPassword(password, againPassword, 5);
})


function addLogin() {
    var fullname = loginFullname.value;
    var username = loginUsername.value;
    var password = loginpassword.value;

    var arr = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];
    var User = {
        Fullname: fullname,
        Username: username,
        Password: password
    }
    arr.push(User);
    localStorage.setItem('account', JSON.stringify(arr));
    clear();
}

// ** Check lỗi Form
var isFullname = false;
var isUsername = false;
var isPassword = false;
var isAgainPassword = false;
var errorMessage = document.querySelectorAll('.error-message');

function checkFullname(fullname, index) {
    if(fullname === '' || fullname === null) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Họ tên không được để trống`
        errorMessage[index].style.opacity = '1';
    }
    else if(fullname.length > 30) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Họ tên từ 1-30 ký tự`
        errorMessage[index].style.opacity = '1';
    }
    else {
        isFullname = true;
        errorMessage[index].style.opacity = '0';
    }
}

function checkUsername(username, index) {
    const arr = JSON.parse(localStorage.getItem('account'));
    for(let i=0; i < arr.length; i++) {
        if(username === '' || username === null) {
            errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                            Tên đăng nhập không được để trống`
            errorMessage[index].style.opacity = '1';
        }
        else if(username.length < index || username.length > 20) {
            errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                            Tên đăng nhập từ index-20 ký tự`
            errorMessage[index].style.opacity = '1';
        }
        else if(arr[i].Username === username) {
            errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                            Tên đăng nhập bị trùng, vui lòng nhập tên khác`
            errorMessage[index].style.opacity = '1';
        }
        else {
            isUsername = true;
            errorMessage[index].style.opacity = '0';
        }
    }
}

function checkPassword(password, index) {
    if(password === '' || password === null) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Mật khẩu không được để trống`
        errorMessage[index].style.opacity = '1';
    }
    else if(password.length < 8) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Mật khẩu ít nhất có 8 ký tự`;
        errorMessage[index].style.opacity = '1';
    }
    else {
        isPassword = true;
        errorMessage[index].style.opacity = '0';
    }
}

function checkAgainPassword(password, againPassword, index) {
    if(againPassword === '' || againPassword === null) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Mật khẩu không được để trống`
        errorMessage[index].style.opacity = '1';
    }
    else if(password !== againPassword) {
        errorMessage[index].innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
                                        Mật khẩu nhập lại không đúng`;
        errorMessage[index].style.opacity = '1';
    }
    else {
        isAgainPassword = true;
        errorMessage[index].style.opacity = '0';
    }
}

// Kiểm tra đăng nhập Người dùng bình thường
function checkSignin() {
    var Username = document.getElementById('Username').value;
    var Password = document.getElementById('Password').value;
    const arr = JSON.parse(localStorage.getItem('account'));
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].Username == Username && arr[i].Password == Password) {
            arr[1].Fullname = arr[i].Fullname;
            arr[1].Username = arr[i].Username;
            arr[1].Password = arr[i].Password;
            localStorage.setItem('account', JSON.stringify(arr));
            return true;
        }
    }

    return false;
}

// Kiểm tra đăng nhập Người dùng là Admin
function checkAdmin() {
    var Username = document.getElementById('Username').value;
    var Password = document.getElementById('Password').value;
    const arr = JSON.parse(localStorage.getItem('account'));
    for(let i = 0; i < arr.length; i++) {
        if (Username == "admin" && Password == "admin") {
            return true;
        }
    }

    return false;
}

function clear() {
    loginFullname.value = "";
    loginUsername.value = "";
    loginpassword.value = "";
    loginAgainPassword.value = "";
}

document.getElementById('login-btn').onclick = function(e) {
    if(isFullname === true && isUsername === true && isPassword === true && isAgainPassword === true) {
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
    else {
        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(0)';
            overlayNotify.style.opacity = '1';
            overlayNotify.innerHTML = `<div class="login-notify error">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                        Đăng ký chưa hợp lệ!!
                                    </div>`;
        }, 500)

        setTimeout(function() {
            overlayNotify.style.transform = 'translateX(100%)';
            overlayNotify.style.opacity = '0';
        }, 2000)
    }
}

document.getElementById('Username').onblur = function() {
    var username = document.getElementById('Username').value;
    checkUsername(username, 0);
}

document.getElementById('Password').onblur = function() {
    var password = document.getElementById('Password').value;
    checkPassword(password, 1);
}

document.getElementById('Login-Btn').onclick = function() {
    const arr = JSON.parse(localStorage.getItem('account'));
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
            document.getElementById('Username').value = "";
            document.getElementById('Password').value = "";
        }, 2000)
    }

    localStorage.setItem('account',JSON.stringify(arr))
}

// Kiểm tra tài khoản đã có hay chưa
function checkAccount() {
    const arr = JSON.parse(localStorage.getItem("account"));

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
        }

        localStorage.setItem('account',JSON.stringify(arr));
    }   
}

// Xử lý khi ấn vào nút Log out
const logout = document.querySelector('.sidebar__log-out');
const notify = document.querySelector('.notify'); 

function checkLogout() {
    logout.onclick = function() {
        const arr = JSON.parse(localStorage.getItem("account"));

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
        localStorage.setItem('account',JSON.stringify(arr));

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

// ** tìm kiếm sản phẩm

// ==> Gọi các hàm để thực hiện xử lý
sidebarControl();
sectionControl(sectionItems);
productHandle(0);
scrollTopHandle();
checkAccount();
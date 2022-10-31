// ** Xử lý thay đổi URL trên sidebar
const sidebarItems = document.querySelectorAll('.sidebar__menu-item');

function sidebarControl() {
    sidebarItems.forEach(function(sidebarItem, index) {
        sidebarItem.onclick = function() {
            switch(index) {
                case 0:
                    window.location.pathname = "/html/home.html";
                    console.log(0);
                    break;
                case 1:
                    window.location.pathname = "/html/food.html";
                    console.log(1);
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
}

// **

const settingItems = document.querySelectorAll('.setting__sidebar-item');
const settingContent = document.querySelector('.setting__content');

function settingControl() {
    settingItems.forEach(function(settingItem, index) {
        settingItem.onclick = function() {
            settingContent.innerHTML = settingItem.innerText;
        }
    })
}

// ==> Gọi các hàm để thực hiện xử lý
sidebarControl();
settingControl();
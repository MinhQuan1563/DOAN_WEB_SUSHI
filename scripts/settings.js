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
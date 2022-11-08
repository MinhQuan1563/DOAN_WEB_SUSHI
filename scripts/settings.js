import { products } from "./json.js";

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

// Render sản phẩm ra Table
function showProduct() {
    const arr = JSON.parse(localStorage.getItem('product'));
    var htmls = '<table>';
    let temp = 1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            htmls += `
            <tr>
            <td style="width: 5%">${temp++}</td>
            <td style="width: 10%">${"shushi"}</td>
            <td style="width: 40%" class="fa__left">${arr[i][j].name}</td>
            <td style="width: 15%">${arr[i][j].price}</td>
            <td style="width: 15%"><img src="${arr[i][j].image}"></td>
            <td style="width: 15%">
            <div class="tooltip update">
                    <i class="fa fa-wrench"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip delete">
                    <i class="fa fa-trash"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
            </tr>`
        }
    }
    htmls += '</table>';
    document.getElementById('table-product').innerHTML = htmls;
    localStorage.setItem("product", JSON.stringify(arr));
}

showProduct();

// Xử lý thêm sản phẩm
const addProductBtn = document.getElementById('add-product');
const overlayProduct = document.querySelector('.overlay.product');
const confirmAdd = document.getElementById('add-btn');
const indexType = document.querySelector('.overlay.product select');
const nameProduct = document.querySelector('.overlay.product input.name');
const imgProduct = document.querySelector('.overlay.product input[type="file"]');
const priceProduct = document.querySelector('.overlay.product input.price');
const notify = document.querySelector('.notify');

function addProduct() {
    addProductBtn.addEventListener('click', function() {
        overlayProduct.style.transform = 'scale(1)';
    })
    
    confirmAdd.onclick = function() {
        const arr = JSON.parse(localStorage.getItem('product'));
        const img = imgProduct.value;
        const name = nameProduct.value;
        const price = priceProduct.value

        if(img != "" && name != "" && price != "") {
            arr[indexType.value].push({
                img: img,
                name: name,
                price: price
            })
            
            localStorage.setItem("product", JSON.stringify(arr));
            
            setTimeout(function() {
                notify.classList.add('success');
                notify.innerHTML = `<i class="fa-solid fa-circle-check"></i>
                Thêm sản phẩm thành công`;
                notify.style.opacity = '1';
            }, 200)
            
            setTimeout(function() {
                notify.style.opacity = '0';
            }, 1200)
            
            setTimeout(function() {
                overlayProduct.style.transform = 'scale(0)';
            }, 1300)
            
            showProduct();
        }
        else {
            setTimeout(function() {
                notify.classList.add('error');
                notify.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
                                Chưa điền đủ thông tin sản phẩm`;
                notify.style.opacity = '1';
            }, 200)
    
            setTimeout(function() {
                notify.style.opacity = '0';
            }, 1200)
        }
        notify.classList.remove('error');
        notify.classList.remove('success');
        notify.innerHTML = '';
    }

}

addProduct();

// Xử lý xóa sản phẩm
const removeProductBtns = document.querySelectorAll('.tooltip.delete');
const notifyDelete = document.querySelector('.notify__delete');

console.log(notifyDelete)

function removeProduct() {
    removeProductBtns.forEach(function(removeProductBtn) {
        removeProductBtn.onclick = function() {
            const arr = JSON.parse(localStorage.getItem('product'));

            setTimeout(function() {
                notifyDelete.style.transform = 'translateY(0)';
                document.querySelector('.notify__delete-ok').onclick = function() {
                    
                }

                document.querySelector('.notify__delete-cancel').onclick = function() {
                    notifyDelete.style.transform = 'translateY(-170%)';
                }
            }, 200)
            
            setTimeout(function() {
                
            }, 1200)
        }
    })
}

removeProduct();
    
/*function timSanPham() {
    const arr = JSON.parse(localStorage.getItem('product'))
    var list = [];
    var x = `
    <tr>
    <th title="Sắp xếp" style="width: 5%"">Stt</th>
    <th title="Sắp xếp" style="width: 10%"">Mã</th>
    <th title="Sắp xếp" style="width: 40%"">Tên</th>
    <th title="Sắp xếp" style="width: 15%"">Giá</th>
    <th title="Sắp xếp" style="width: 15%"">Hình Ảnh</th>
    <th style="width: 15%">Hành động</th>
    </tr>
    `
    let temp = 0;
    let temp2 = 0;
    let temp3 = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (val == arr[i][j].name) {
                list.push(arr[i][j]);
                alert(list)
            }
        }
    }
    for (let i = 0; i < list.length; i++) {
        x += `<tr>
        <td>${temp++}</td>
        <td>${temp2++}</td>
        <td class="fa__left">${list[i].name}</td>
        <td>${list[i].price}</td>
        <td><img src="$list[i].image}"></td>
        <td>${temp3++}</td>
        </tr>`
    }
    document.getElementById('test').innerHTML = x;
}*/



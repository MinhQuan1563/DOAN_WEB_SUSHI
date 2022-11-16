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

var imgSrc;
function uploadImg(event) {
    imgSrc = URL.createObjectURL(event.target.files[0]);
}

// Render sản phẩm ra Table
function showProduct() {
    const arr = JSON.parse(localStorage.getItem('product'));
    var htmls = '<table>';
    let temp = 1;
    var a = ["Bento", "Sushi", "Sashimi", "Combo Sashimi", "Món ăn kèm", "Nước uống và tráng miệng"]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            htmls += `
            <tr>
            <td style="width: 5%">${temp++}</td>
            <td style="width: 10%">${a[i]}</td>
            <td style="width: 40%" class="fa__left">${arr[i][j].name}</td>
            <td style="width: 15%">${arr[i][j].price}</td>
            <td style="width: 15%"><img src="${arr[i][j].image}"></td>
            <td style="width: 15%">
            <div class="tooltip update" onclick="editProduct(${i}, ${j})">
                    <i class="fa fa-wrench"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip delete" onclick="deleteProduct(${i}, ${j})">
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

// D:\\MINHQUAN\\Workspace\\Do an web\\WEB_FOOD\\

showProduct();

// Xử lý thêm sản phẩm
const addProductBtn = document.getElementById('add-product');
const overlayProduct = document.querySelector('.overlay.product.add');
const overlayProduct2 = document.querySelector('.overlay.product.edit');
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
                img: imgSrc,
                name: name,
                price: price
            })
            console.log(imgSrc)
            
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
            imgProduct.value = "";
            nameProduct.value = "";
            priceProduct.value = "";
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
const notifyDelete = document.querySelector('.notify__delete');

function deleteProduct(i, j) {
    notifyDelete.innerHTML = `<div class="notify__delete-text">
                Bạn có chắc sẽ xóa sản phẩm này không?
            </div>
            <div class="notify__delete-btn">
                <div class="notify__delete-ok">
                    OK
                </div>
                <div class="notify__delete-cancel">
                    Hủy
                </div>
            </div>`

    setTimeout(function() {
        notifyDelete.style.transform = 'translate(-50%, 0)';
        notifyDelete.style.opacity = '1';
        document.querySelector('.notify__delete-ok').onclick = function() {
            const arr = JSON.parse(localStorage.getItem('product'));
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';

            arr[i].splice(j, 1);

            localStorage.setItem("product", JSON.stringify(arr));
            showProduct();
        }
        document.querySelector('.notify__delete-cancel').onclick = function() {
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';
        }
    }, 200)
    
}



// Sửa lỗi ảnh
function updateProductImg(files, id) {
    // var url = '';
    // if(files.length) url = window.URL.createObjectURL(files[0]);
    
    // document.getElementById(id).src = url;

    // console.log(url);

    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        previewSrc = reader.result;
        document.getElementById(id).src = previewSrc;
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
}



// Xử lý sửa sản phẩm
function editProduct(i, j) {
    const arr = JSON.parse(localStorage.getItem('product'));
    var htmls = `
    <div class="close" onclick="this.parentElement.style.transform = 'scale(0)';">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <table class="overlayTable table-outline table-content table-header">
                        <tr>
                            <th colspan="2">Xóa Sản Phẩm</th>
                        </tr>
                        <tr>
                            <td>Loại sản phẩm:</td>
                            <td>
                                <select>`

    var tmp = ["Bento", "Sushi", "Sashimi", "Combo Sashimi", "Món ăn kèm", "Nước uống và tráng miệng"];
    for(var k in tmp) {
        if(i == k)
            htmls += (`<option value="`+k+`" selected>`+tmp[k]+`</option>`);
        else
            htmls += (`<option value="`+k+`">`+tmp[k]+`</option>`);
    }
    
    htmls += `</select>
                </td>
            </tr>
            <tr>
                <td>Tên sản phẩm:</td>
                <td><input type="text" class="name" value="${arr[i][j].name}"></td>
            </tr>
            <tr>
                <td>Hình ảnh:</td>
                <td>
                    <img src="${arr[i][j].image}" id="productImgAdd">
                    <input type="file" name="" id=""  onchange="uploadImg(this.files, 'productImgAdd', event)">
                </td>
            </tr>
            <tr>
                <td>Giá tiền:</td>
                <td><input type="text" class="price-2" value="${arr[i][j].price}"></td>
            </tr>
            <tr>
                <td colspan="2" class="table-footer">
                    <button id="edit-btn">SỬA</button>
                </td>
            </tr>
        </table>

        <div class="notify">
            
        </div>`
    document.querySelector('.overlay.product.edit').innerHTML = htmls;
    overlayProduct2.style.transform = 'scale(1)';

    const editBtn = document.getElementById('edit-btn');

    editBtn.onclick = function() {
        
    }

}
    
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



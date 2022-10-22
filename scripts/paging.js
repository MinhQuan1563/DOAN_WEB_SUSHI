import {products} from "./json.js"

export {PagiHandle, start1, end};

// Xử lý phân trang

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');

var perPage = 8;
var curPage = 1;
var start1 = 0;
var end = perPage;
var totalPage = Math.ceil(products[0].length / perPage);

function getCurrentPage(curPage) {
    start1 = (curPage - 1) * perPage;
    end = curPage * perPage;
}

function PagiHandle() {
    btnNext.onclick = function() {
        curPage++;
        if(curPage > totalPage) {
            curPage = totalPage;
        }
        getCurrentPage();
        renderProduct(products[0]);
    }

    btnPrev.onclick = function() {
        curPage--;
        if(curPage <= 1) {
            curPage = 1 ;
        }
        getCurrentPage();
        renderProduct(products[0]);
    }
}
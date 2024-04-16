"use strict";

const outputReview = document.querySelector('output__review');

for (let i = 0; i < localStorage.length; i++) {
    let product = localStorage.key(i);
    let reviewList = JSON.parse(localStorage.getItem(product));

    const wrapProduct = document.createElement('div');
    outputReview.insertAdjacentElement('beforeend', wrapProduct);

    wrapProduct.insertAdjacentHTML('beforeend', `<h2 onclick='showReview(this)' style='cursor: pointer;'>${product}<h2/>`);
    
    const wrapReview = document.createElement('div');
    wrapReview.hidden = true;
    wrapProduct.insertAdjacentElement('beforeend', wrapReview);

    reviewList.forEach(element => {
        const reviewItem = document.createElement('div');
        wrapReview.insertAdjacentElement('beforeend', reviewItem);

        
    }
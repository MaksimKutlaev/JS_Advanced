"use strict";

const inputProductEl = document.querySelector('.input__product');
const inputReviewEl = document.querySelector('.input__review');
const buttonSubmitEl = document.querySelector('.input__submit');
const messageErrorEl = document.querySelector('.input__error');

buttonSubmitEl.addEventListener('click', () => {
    const product = inputProductEl.value;
    const review = inputReviewEl.value;
    if (product !== '' && review!== '') {
        let store = JSON.parse(localStorage.getItem(product));
        if (store === null) {
            store = [];
        }
        store.push(review);
        localStorage.setItem(product, JSON.stringify(store));
        inputProductEl.value = '';
        inputReviewEl.value = '';
    } else {
        messageErrorEl.textContent = 'Please enter a product and review';
    }
});
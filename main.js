getData("spring", "");

// search
const icon = document.querySelector('.placeholder__icon');
const input = document.querySelector('.placeholder__search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnClose = document.querySelector('.btn-close');

const wrapper = document.querySelector('.wrapper');
const galleryBigBlock = document.querySelector('.gallery-big-block');
const bigSizePhoto = document.querySelector('.img-big-size-photo');

const selectColor = document.querySelector('.select__color');

let images = [];
let currentImage = 0;


async function getData(query, color) {
    let url = `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=18&client_id=PV3lCodTX9shtq5ZsjvQnAOH9qzO3GYk_ZC5f3K0zY0`;
    if (color && color !== "") {
        url += `&color=${color}`;
    }
    let res = await fetch(url);
    let data = await res.json();
    showData(data);
}

function showKingSizePhoto(imgNum) {
    wrapper.classList.add('blur-10');
    galleryBigBlock.classList.remove('d-none');
    // bigSizePhoto.src = images[imgNum].urls.regular;
    if (imgNum < 0){
        bigSizePhoto.src = images[images.length + imgNum].urls.regular;
    } else {
        bigSizePhoto.src = images[imgNum].urls.regular;
    }
    if (imgNum > (images.length - 1)){
        bigSizePhoto.src = images[0].urls.regular;
    } else {
        bigSizePhoto.src = images[imgNum].urls.regular;
    }
    currentImage = imgNum;
}

function showData(data) {
    let gallery = document.querySelector('.gallery');
    let imgs = document.querySelectorAll('.gallery__img');
    for (let img of imgs){
        img.remove();
    }
    
    images = data.results;
    for (let item of data.results) {
        const img = `<img class="gallery__img" src=${item.urls.small} alt="image">`;
        gallery.insertAdjacentHTML('beforeend', img);
    }
    
    let imgElements = document.querySelectorAll('.gallery__img');
    for (let [i, imgElement] of imgElements.entries()) {
        imgElement.addEventListener("click", () => showKingSizePhoto(i));
    }
}

function searchFilter() {
    if(input.value !== '') {
        input.blur();
        getData(input.value, selectColor.value);
    }
}

icon.addEventListener('click', searchFilter);

input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        searchFilter();
    }
});

btnPrev.addEventListener('click', () => {
    showKingSizePhoto(currentImage - 1);
});

btnNext.addEventListener('click', () => {
    showKingSizePhoto(currentImage + 1);
});

btnClose.addEventListener('click', () => {
    wrapper.classList.remove('blur-10');
    galleryBigBlock.classList.add('d-none');
});

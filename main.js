async function getData() {
    let res = await fetch('https://api.unsplash.com/photos/?client_id=PV3lCodTX9shtq5ZsjvQnAOH9qzO3GYk_ZC5f3K0zY0&per_page=12');
    let data = await res.json();
    console.log(data);
    showData(data);

}


function showData(data) {
    let gallery = document.querySelector('.gallery');
    let key;
    for(key in data){
        const img = `<img class="gallery__img" src=${data[key].urls.regular} alt="image">`;
        gallery.insertAdjacentHTML('beforeend', img);
        console.log(data[key].urls)
    }
}


getData()
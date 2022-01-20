document.addEventListener('DOMContentLoaded', () => {
    getImages();
    getBreeds();



    const p = document.createElement('p');
    p.textContent = 0;
    document.body.appendChild(p);

    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+';
    document.body.appendChild(btnPlus);
    
    const btnMinus = document.createElement('button');
    btnMinus.textContent = '-';
    document.body.appendChild(btnMinus);

    btnPlus.addEventListener('click', (e) => {
        e.preventDefault();
        p.textContent = parseInt(p.textContent) + 1});

    btnMinus.addEventListener('click', (e) => {
        e.preventDefault();
        p.textContent = parseInt(p.textContent) - 1});
});

function getImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    getFetchResponse(imgUrl)
    .then(data => showImages(data.message));
}

function getFetchResponse(url) {
    return fetch(url)
    .then(response => response.json())
}

function showImages(imagesUrls) {
    const imgContainer = document.getElementById('dog-image-container');

    imagesUrls.forEach(imageUrl => {
        const imgTag = document.createElement('img');
        imgTag.src = imageUrl;
        imgTag.alt = 'image of a dog';
        imgStyling(imgTag);
        imgContainer.appendChild(imgTag);
    });
}

function imgStyling(img) {
    img.style.width = '500px';
    img.style.padding = '10px';
}

function getBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';

    getFetchResponse(breedUrl)
        .then(data => {showListOfBreeds(Object.keys(data.message));
        console.log(data.message)});
}

function showListOfBreeds(breeds) {
    const breedsUl = document.getElementById('dog-breeds');

    breeds.forEach(breed => {
        createLiTag(breed, breedsUl);
    });

    breedsFilter();
}

function createLiTag(text, parent) {
    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', (e) => { 
        e.preventDefault();
        li.style.color = '#059B9B';
    });
    parent.appendChild(li);
}

let fullList = false;
function breedsFilter() {
    const filter = document.getElementById('breed-dropdown');


    filter.addEventListener('change', e => {
        const filter = e.target.value;
        if(!fullList) {
            breedsListBeforeFilter = document.querySelectorAll('#dog-breeds li');
            fullList = true;
        }

        if(breedsListBeforeFilter.length > 0) {
            clearListOfBreeds();
            showListOfBreeds(getFilteredListOfBreeds(breedsListBeforeFilter, filter));
        } else {
            alert('Sorry, but there\'s nothing to filter');
        }
    });
}

function getFilteredListOfBreeds(fullListOfBreeds, filter) {
    const filteredListOfBreeds = [];
    fullListOfBreeds.forEach(li => {
        if (li.textContent.slice(0,1).toLowerCase() === filter.toLowerCase()) {
            filteredListOfBreeds.push(li.textContent);
        }
    });
    return filteredListOfBreeds;
}

function clearListOfBreeds() {
    const listLi = document.querySelectorAll('#dog-breeds li');
    listLi.forEach(li => li.remove());
}
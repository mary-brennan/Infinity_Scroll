const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//let photosArray = [];

const count = 5;
const apiKey = 'P1yb0ZgBMtajmFIba6Xt7U2gCoTnHRhnfuLadVLovhs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check
function imageLoaded() {

    imagesLoaded++;
    console.log(imagesLoaded);

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count= 30;

    }
}
//hELPER FUNCTION
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages=', totalImages);
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        //<img> create for photo

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Event listener

//Get photos from unsplah API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
       let photosArray = await response.json();
        console.log(photosArray);
        displayPhotos(photosArray);

    } catch (error) {
        console.log(error);
    }
}
// Check to see if scrolling nearing bottom on page and load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();

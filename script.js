const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;

let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = 'HZgGQNF5rLCVG3bYTNpxfyj6vdbu0wPNkYS2u7gToBM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded 
function imageLoaded() {
    console.log('image loaded');
}


// Helper Function to set Attributes on DOM Elements
function setAttribute(Element, Attributes) {
    for (const key in Attributes) {
        Element.setAttribute(key, Attributes[key]);
    }
}


// create Elements for links & photos, add to DOM 
function displayPhotos() {
    //Run function for each object in photoArrays
    photosArray.forEach((photo) => {
        // Create <a> to link Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            tittle: photo.alt_description
        })
        //Event Listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



//Get photos from Unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}



//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
        console.log('load more')
    }
})

// on load
getPhotos();
// Unplash Api

const count = 10;
const apiKey = "NpICOgrphwY_dqZx6EbQVhC3iB8GOUGCJgdwDfUeaGQ";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photoArray = [];

//keeping Track of images loader
let imagesLoaded = 0;
let totaImages = 0;
let ready = false;

//checking If all the images are loaded

function imageLoaded() {
  console.log("images loaded");
  imagesLoaded++;
  if (imagesLoaded == totaImages) {
    loader.hidden = true;
    ready = true;
    console.log("ready ", ready);
  }
}

//Helper function for setting attributes to Elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//This function help in displaying photos by iterating through photoArray and displaying the photos by creating img elements
function displayPhoto() {
  imagesLoaded = 0;
  totaImages = photoArray.length;
  photoArray.forEach((photo) => {
    const aElement = document.createElement("a");
    // aElement.setAttribute("href", photo.links.html);
    // aElement.setAttribute("target", "_blank");

    setAttributes(aElement, {
      href: photo.links.html,
      target: "_blank",
    });

    const imageElement = document.createElement("img");
    // imageElement.setAttribute("src", photo.urls.regular);
    // imageElement.setAttribute("alt", photo.alt_description);
    // imageElement.setAttribute("title", photo.alt_description);

    setAttributes(imageElement, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //EventListener to check whether the image as loaded
    imageElement.addEventListener("load", imageLoaded);

    aElement.appendChild(imageElement);
    imageContainer.appendChild(aElement);
  });
}

//function for fetching the data from unsplash api and storing in photoArray
async function getPhotosFromApi() {
  try {
    const response = await fetch(apiUrl);

    photoArray = await response.json();

    displayPhoto();
  } catch (error) {
    console.log(error);
  }
}
//check to see if we are bottom end of the page,load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromApi();
  }
});

//onLoad
getPhotosFromApi();

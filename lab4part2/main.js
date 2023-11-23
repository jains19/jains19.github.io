//Name: Sumit Jain
//File: main.js
//Date: 17 November 2023

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const imageAltTexts = ['Closeup of a human eye', 'Picture 2', 'Picture Flowers', 'Picture Painting', 'Picture Butterfly'];

/* Looping through images */
for (let i = 1; i <= images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', './images/' +  images[i - 1]);
    newImage.setAttribute('alt', imageAltTexts[i - 1]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', function(event) {
        displayedImage.src = event.target.src;
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function(event) {
    const button = event.target;
    const currentClass = button.getAttribute("class");
    const text = button.textContent;
    if (currentClass === 'dark') {
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        overlay.style.backgroundColor = "rgba(0,0,0,0)"
    }
    button.setAttribute("class", currentClass === 'dark' ? 'light' : 'dark');
    button.textContent = text === 'Darken' ? 'Lighten' : 'Darken';
});

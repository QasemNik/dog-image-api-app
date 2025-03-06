import fetchData from "./apiReq.js";
import { showAlert } from "./showAlert.js";
const imageWrapper =document.querySelector(".image-wrapper");
const button = document.querySelector("button");
const selectElem = document.getElementById('breedSelect');
const imageFetch = document.querySelector('.imageWrapper')

// Generate Random Images
const randomImageHandler = async () => {
try{
imageWrapper.innerHTML = `
<span class='loading'> Loading...</span>
`
    const response = await fetchData('image/random');
    imageWrapper.innerHTML = ''
    
    const jsx = `
    <img src="${response.message}" alt= 'dogs'  id='image'>
    `
    
 imageWrapper.innerHTML = jsx
        
    } catch (error){
    showAlert(error.message)    
    }
} 

// select Dog Breeds
const breedHandler = async () => {
    try {
        const response = await fetchData('list/all');
        const breedsData = Object.keys(response.message);

        selectElem.innerHTML = `<option value="">Select a Breed</option>`; 

        breedsData.forEach(breed => {
            const option = `<option value="${breed}">${breed.charAt(0).toUpperCase() + breed.slice(1)}</option>`;
            selectElem.innerHTML += option;
        });
    } catch (error) {
showAlert(error.message)        
    }
};
const fetchRandomImage = async () => {
    try {
        const breed = selectElem.value;
        if (breed) {
              imageFetch.innerHTML = `<span class='loading'> Loading...</span>`;

        const response = await fetchData(`image/random/${breed}`);
        imageFetch.innerHTML = `
            <img src="${response.message}" alt='dog' id='breedDog'>
        `;
        
    }else{
            imageFetch.innerHTML = `<span class='selectError'> Please select a Breed</span>`;
        }
    } catch (error) {
showAlert('something went wrong')
    }
};

// Infinite Scroll
const imageContainer = document.querySelector('.image-container')
const loader = document.querySelector('.loader')
async function fetchImages(){
    try {
    const response = await fetchData('image/random/3')
    ;
    const images = response.message.map(image => {
        return `<img src="${image}" alt="dog" id="infiniteBreed">`

    })
    imageContainer.innerHTML += images
    } catch (error) {
        showAlert('Error:'+ error.message)
    }
}
const observe = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        fetchImages();
}
},{threshold:1});
observe.observe(loader);

function init(){
    breedHandler()
    fetchRandomImage()
    fetchImages()
    randomImageHandler()
    selectElem.addEventListener('change', fetchRandomImage);

}
getImage.addEventListener('click', fetchRandomImage);
window.addEventListener("DOMContentLoaded", init) 
button.addEventListener("click", randomImageHandler);

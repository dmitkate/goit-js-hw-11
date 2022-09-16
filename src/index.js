import './css/styles.css';
import cardTmpl from './card.hbs';
import { runFetches } from './api.js';
import Notiflix from 'notiflix';

const refs = {
    searchButton: document.querySelector('.search-form__button'),
    searchInput: document.querySelector('.search-form__input'),
    galleryArea: document.querySelector('.gallery'),
};



// function onImageInput(name) {
//     name = refs.searchInput.value.trim()
    // if (name === '') {
    //     return (refs.galleryArea.innerHTML = '')
    // }

runFetches()
        .then((data) => {
            renderGallery(data.hits)
           //simpleLightBox = new SimpleLightbox('.gallery a').refresh()
            //alertImagesFound(data)

            
        })
        .catch(error => console.log(error))
// }


function renderGallery(image) {
    const markup = image
    .map((webformatURL,tags,likes,viewes,comments,downloads ) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}$</b>
    </p>
    <p class="info-item">
      <b>Views:${viewes}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`
    })
    .join('')
    //refs.searchButton.addEventListener('submit', onImageInput)
}




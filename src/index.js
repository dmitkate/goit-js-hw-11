import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css'
import SimpleLightbox from 'simplelightbox'

import { runFetches } from './api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    moreBtn: document.querySelectorAll('.footer-button'),
    searchForm: document.querySelector('#search-form'),
    galleryArea: document.querySelector('.gallery'),
};

let page = "";
let query = "";
refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
    e.preventDefault()
    page = 1;
    query = e.currentTarget.searchQuery.value.trim()
  if (query === '') {
        return Notify.failure("Oh sorry, there are no images matching your search query. Please try again.")
  }
    
    runFetches(query, page)
    .then((r) => {
        
        render(r.hits);
        Notify.success(`We found ${r.totalHits} images.`); 
        simpleLightBox = new SimpleLightbox('.gallery a').refresh() 
         
             
    })
    .catch(error => console.log(error))
}
function endOfcollectionCheck(totalHits, page){
    const totalPages = Math.ceil(totalHits / 40);
        if (page >= totalPages) {
            Notify.info("We're sorry, but you've reached the end of search results.");

            return;
    }
};

function render(items) {
  const markup =items
        .map(item => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = item
        return `
            <a class="gallery__link" href="${largeImageURL}">
            <div class="gallery-item" id="${id}">
                <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = "640" height = "400" />
                <div class="info">
                <p class="info-item"><b>Likes: </b>${likes}</p>
                <p class="info-item"><b>Views: </b>${views}</p>
                <p class="info-item"><b>Comments: </b>${comments}</p>
                <p class="info-item"><b>Downloads: </b>${downloads}</p>
                </div>
            </div>
            </a>
        `
        })
    .join('')
refs.galleryArea.insertAdjacentHTML("beforeend", markup)
}



window.addEventListener('scroll', () => {
    const docRect = document.documentElement.getBoundingClientRect();
    
    if (docRect.bottom < document.documentElement.clientHeight + 150) {
        page+=1;
        runFetches(query, page).then((r) => {
        endOfcollectionCheck(r.totalHits, page);
        render(r.hits);
         simpleLightBox = new SimpleLightbox('.gallery a').refresh()               
    }).catch(error => console.log(error))
    }
})  





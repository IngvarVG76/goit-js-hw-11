// api.js

export const api = {
    apiKey: '36587566-5f2e8f43046e4651407f546e8',
    baseURL: 'https://pixabay.com/api/',
    perPage: 40,
    currentPage: 1,
    currentQuery: '',
};

// fetchPics.js

import axios from 'axios';
import Notiflix from 'notiflix';
import { api } from './api';
import { displayImages } from './render';

// Function to search images
export async function searchImages(query) {
  try {
    const response = await axios.get(api.baseURL, {
      params: {
        key: api.apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: api.currentPage,
        per_page: api.perPage,
      },
    });

    // const data = response.data;

    // if (data.hits.length === 0) {
    //   if (api.currentPage === 1) {
    //     Notiflix.Notify.failure(
    //       'Sorry, there are no images matching your search query. Please try again.'
    //     );
    //   } else {
    //     hideLoadMoreButton();
    //   }
    // } else {
    //   displayImages(data.hits);
    //   showLoadMoreButton();
    //   if (data.totalHits) {
    //       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    //   }
    //   if (data.hits.length < api.perPage) {
    //     hideLoadMoreButton();
    //       Notiflix.Notify.warning(
    //         "We're sorry, but you've reached the end of search results."
    //       );
    //   }
    //   refreshLightbox();
    //   scrollToNextGroup();
    // }
  } catch (error) {
    console.log(error);
  }
}



// refs.js

export const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// index.js

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import { api } from './js/api';
import { searchImages } from './js/fetchPics';

// Event listener for form submission
refs.searchForm
  .addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();

    if (searchQuery !== '') {
      api.currentQuery = searchQuery;
      api.currentPage = 1;
      clearGallery();
      searchImages(api.currentQuery);
    }
    return data;
  })
  .then(queryHandler);

function queryHandler() {
  
    const data = response.data;

    if (data.hits.length === 0) {
      if (api.currentPage === 1) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        hideLoadMoreButton();
      }
    } else {
      displayImages(data.hits);
      showLoadMoreButton();
      if (data.totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.hits.length < api.perPage) {
        hideLoadMoreButton();
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      refreshLightbox();
      scrollToNextGroup();
    }
}

// Event listener for "Load more" button
refs.loadMoreBtn
  .addEventListener('click', () => {
    if (data.hits.length < api.perPage) {
      hideLoadMoreButton();
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      api.currentPage++;
      searchImages(api.currentQuery);
    }
    return data;
  }
  ).then(queryHandler);



// Function to clear the gallery
function clearGallery() {
  refs.gallery.innerHTML = '';
}

// Function to show the "Load more" button
function showLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'block';
}

// Function to hide the "Load more" button
function hideLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'none';
}


// Function to refresh the lightbox
function refreshLightbox() {
  // Implementation for refreshing the lightbox
}

// Function to scroll to the next group of images
function scrollToNextGroup() {
  // Implementation for scrolling to the next group of images
}

  // Initialize SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    // captionsData: 'alt',
    // captionPosition: 'bottom',
    // captionDelay: 250,
    closeText: '&times;',
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    history: true,
    enableKeyboard: true,
    close: true,
  });
  lightbox.refresh();


// render.js

import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import {refs} from "./refs"

// Display images
export function displayImages(images) {
  const cards = images.map(image => createCard(image));
  refs.gallery.insertAdjacentHTML('beforeend', cards.join(''));
}

// Create card markup for an image
function createCard(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

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

// Function to search images
export async function searchImages(query) {
  try {
    const response = await axios.get(api.baseURL, {
      params: {
        key: api.apiKey,
        q: api.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: api.currentPage,
        per_page: api.perPage,
      },
    });

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
      renderImages(data.hits);
      showLoadMoreButton();
      if (data.totalHits) {
        //   showMessage(`Hooray! We found ${data.totalHits} images.`);
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.hits.length < perPage) {
        hideLoadMoreButton();
        // showMessage(
        //     "We're sorry, but you've reached the end of search results."
            
        //   );
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
      }
      refreshLightbox();
      scrollToNextGroup();
    }
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

import { refs } from './js/refs';
import { api } from './js/api';
import { searchImages } from './js/fetchPics';

// Event listener for form submission
refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  console.log(form);
  const searchQuery = form.elements.searchQuery.value.trim();
  if (searchQuery !== '') {
    api.currentQuery = searchQuery;
    api.currentPage = 1;
    clearGallery();
    searchImages(api.currentQuery);
  }
});

// Event listener for "Load more" button
refs.loadMoreBtn.addEventListener('click', () => {
  api.currentPage++;
  searchImages(api.currentQuery);
});

// Function to render image cards in the gallery
function renderImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const card = createImageCard(image);
    fragment.appendChild(card);
  });
  refs.gallery.appendChild(fragment);
}

// Function to create an image card
function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const imageElement = document.createElement('img');
  imageElement.src = image.webformatURL;
  imageElement.alt = image.tags;
  imageElement.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = createInfoItem('Likes', image.likes);
  const views = createInfoItem('Views', image.views);
  const comments = createInfoItem('Comments', image.comments);
  const downloads = createInfoItem('Downloads', image.downloads);

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  card.appendChild(imageElement);
  card.appendChild(info);

  return card;
}

// Function to create an info item
function createInfoItem(label, value) {
  const item = document.createElement('p');
  item.classList.add('info-item');
  item.innerHTML = `<b>${label}</b>: ${value}`;
  return item;
}

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

// Function to show a message
// function showMessage(message) {
// const messageElement = document.createElement('p');
// messageElement.classList.add('message');
// messageElement.textContent = message;
// gallery.appendChild(messageElement);
// }

// Function to hide the message
// function hideMessage() {
//   const messageElement = document.querySelector('.message');
//   if (messageElement) {
//     messageElement.remove();
//   }
// }

// Function to refresh the lightbox
function refreshLightbox() {
  // Implementation for refreshing the lightbox
}

// Function to scroll to the next group of images
function scrollToNextGroup() {
  // Implementation for scrolling to the next group of images
}

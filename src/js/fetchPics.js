import axios from 'axios';
import Notiflix from 'notiflix';
import { api } from './api';
import { displayImages, clearGallery, lightboxLaunch } from './render';
import {
  showLoadMoreButton,
  hideLoadMoreButton,
  activateLoadMoreButton,
  deactivateLoadMoreButton,
} from './button';

// Images query
export async function searchImages(query) {
  deactivateLoadMoreButton();
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
    const data = await response.data;
    activateLoadMoreButton();
    queryHandler(data);
    api.currentArrey = data.hits.length;
  } catch (error) {
    Notiflix.Notify.failure(`Ups :( Some bad things happened ${error.message}`);
    console.log(error);
  }
}

// Query Handler
function queryHandler(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hideLoadMoreButton();
    clearGallery();
    api.currentPage === 1;
    api.currentQuery === '';
    return;
  }
  if (api.currentPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  showLoadMoreButton();
  displayImages(data.hits);
  api.currentPage += 1;
  if (data.hits.length < api.perPage) {
    hideLoadMoreButton();
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  lightboxLaunch();
}

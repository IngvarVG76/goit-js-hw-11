import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import { searchImages, api } from './js/fetchPics';
import { displayImages, clearGallery, lightboxLaunch } from './js/render';
import { showLoadMoreButton, hideLoadMoreButton } from './js/button';

// On submit
function queryOnSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    Notiflix.Notify.warning('The field shold not be emty!');
    return;
  }
  api.currentQuery = searchQuery;
  api.currentPage = 1;
  api.totalLoaded = 0;
  api.totalHits = 0;
  clearGallery();
  searchImages(api.currentQuery)
    .then(data => {
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
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      displayImages(data.hits);
      showLoadMoreButton();
      lightboxLaunch();
      api.currentPage += 1;
      api.currentArrey = data.hits.length;
      api.totalLoaded += data.hits.length;
      api.totalHits = data.totalHits;
      console.log(
        `Total found: ${api.totalHits} Total loaded: ${api.totalLoaded}`
      );
      return data;
    })
    .then(data => {
      if (api.currentArrey < api.perPage || api.totalLoaded >= api.totalHits) {
        hideLoadMoreButton();
      }
      return data;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Ups :( Some bad things happened ${error.message}`
      );
      console.log(error);
    });
}

// Event listener for form submission
refs.searchForm.addEventListener('submit', queryOnSubmit);

// On Load More Btn
function queryOnLoadMore(event) {
  searchImages(api.currentQuery)
    .then(data => {
      displayImages(data.hits);
      api.currentPage += 1;
      api.currentArrey = data.hits.length;
      api.totalLoaded += data.hits.length;
      console.log(
        `Total found: ${api.totalHits} Total loaded: ${api.totalLoaded}`
      );
      lightboxLaunch();
      return data;
    })
    .then(data => {
      if (data.hits.length < api.perPage || api.totalLoaded >= api.totalHits) {
        hideLoadMoreButton();
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      return data;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Ups :( Some bad things happened ${error.message}`
      );
      console.log(error);
    });
}

refs.loadMoreBtn.addEventListener('click', queryOnLoadMore);

// On Scroll
function queryOnScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (api.currentArrey < api.perPage || api.totalLoaded >= api.totalHits) {
    return;
  } else if (scrollTop + clientHeight >= scrollHeight - 5) {
    searchImages(api.currentQuery)
      .then(data => {
        displayImages(data.hits);
        api.currentPage += 1;
        api.currentArrey = data.hits.length;
        api.totalLoaded += data.hits.length;
        console.log(
          `Total found: ${api.totalHits} Total loaded: ${api.totalLoaded}`
        );
        lightboxLaunch();
        return data;
      })
      .then(data => {
        if (
          data.hits.length < api.perPage ||
          api.totalLoaded >= api.totalHits
        ) {
          hideLoadMoreButton();
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
        return data;
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Ups :( Some bad things happened ${error.message}`
        );
        console.log(error);
      });
  }
}

// Event listener for Infinite  sckroll
const DEBOUNCE_DELAY = 300;

window.addEventListener('scroll', debounce(queryOnScroll, DEBOUNCE_DELAY));

import { refs } from './js/refs';
import { api } from './js/api';
import { searchImages } from './js/fetchPics';
import { clearGallery } from './js/render';

// Event listener for form submission
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
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
  searchImages(api.currentQuery);
});


// Infinite  sckroll
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (api.currentArrey < api.perPage) {
    return;
}
  else if (scrollTop + clientHeight >= scrollHeight - 5) {
    searchImages(api.currentQuery);
  }
}

window.addEventListener('scroll', handleScroll);



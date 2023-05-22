import axios from 'axios';
import Notiflix from 'notiflix';
import { api } from './api';

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
      if (data.hits.length < api.perPage) {
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

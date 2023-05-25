import axios from 'axios';

import { activateLoadMoreButton, deactivateLoadMoreButton } from './button';

export const api = {
  apiKey: '36587566-5f2e8f43046e4651407f546e8',
  baseURL: 'https://pixabay.com/api/',
  perPage: 40,
  currentPage: 1,
  currentQuery: '',
  currentArrey: 1,
  totalHits: 0,
  totalLoaded: 0,
};

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
    return data;
  } catch (error) {}
}

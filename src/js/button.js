import { refs } from './refs';

// Function to show the "Load more" button
export function showLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'block';
}

// Function to hide the "Load more" button
export function hideLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'none';
}

// Function to Activate the "Load more" button
export function activateLoadMoreButton() {
  refs.loadMoreBtn.classList.add('active');
  refs.loadMoreBtn.disabled = false;
}

// Function to Deactivate the "Load more" button
export function deactivateLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('active');
  refs.loadMoreBtn.disabled = true;
}
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

// Update markup
export function displayImages(images) {
  const cards = images.map(image => createCard(image));
  refs.gallery.insertAdjacentHTML('beforeend', cards.join(''));
}

// Create card markup for images
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

// Clear the gallery
export function clearGallery() {
  refs.gallery.innerHTML = '';
}

// Launch SimpleLightbox
export function lightboxLaunch() {
  const lightbox = new SimpleLightbox('.gallery a', {
    closeText: '&times;',
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    history: true,
    enableKeyboard: true,
    close: true,
  });
  lightbox.refresh();
}

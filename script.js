// Photo details live in one list so the cards and lightbox stay in sync.
const photos = [
  { title: 'Blue hour', location: 'Amalfi Coast, Italy', category: 'COAST', src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=90', alt: 'Colorful houses above the blue Mediterranean Sea' },
  { title: 'The quiet path', location: 'Kyoto, Japan', category: 'NATURE', src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1800&q=90', alt: 'A quiet path framed by the red gates of Kyoto' },
  { title: 'After the rain', location: 'Paris, France', category: 'CITY', src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1800&q=90', alt: 'Paris rooftops and a landmark beneath a soft sky' },
  { title: 'Into the wild', location: 'Þingvellir, Iceland', category: 'NATURE', src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1800&q=90', alt: 'Deer standing in a sunlit forest' },
  { title: 'Salt in the air', location: 'Cinque Terre, Italy', category: 'COAST', src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=90', alt: 'Hillside coastal village with colorful houses' },
  { title: 'The long way home', location: 'New York, USA', category: 'CITY', src: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1800&q=90', alt: 'New York street and city buildings at dusk' },
];

const cards = [...document.querySelectorAll('.photo-card')];
const filterButtons = [...document.querySelectorAll('.filter-button')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCount = document.querySelector('.lightbox-count');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxLocation = document.querySelector('.lightbox-location');
let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCount.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}  ·  ${photo.category}`;
  lightboxTitle.textContent = photo.title;
  lightboxLocation.textContent = photo.location;
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    showPhoto(Number(card.dataset.index));
    lightbox.showModal();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;
    filterButtons.forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle('is-active', isSelected);
      filter.setAttribute('aria-pressed', String(isSelected));
    });
    cards.forEach((card) => {
      card.hidden = selectedCategory !== 'all' && card.dataset.category !== selectedCategory;
    });
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentPhoto + 1));

// Clicking the dark area around the photo closes the viewer.
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

// Native dialog handles Escape; arrow keys move through the collection.
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
  if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
});

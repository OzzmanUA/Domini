// pop_services.js
export function initScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
  
    scrollLeftBtn?.addEventListener('click', () => {
      scrollContainer?.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    });
  
    scrollRightBtn?.addEventListener('click', () => {
      scrollContainer?.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    });
  }
  
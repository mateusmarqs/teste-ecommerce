const target = document.querySelectorAll('[data-anime]');

function toggleMenu() {
  const mainMenu = document.getElementById('main-menu');
  const subMenu = document.getElementById('sub-menu');
  mainMenu.classList.toggle('active');
  subMenu.classList.toggle('active');
}

function animeScroll() {
  const windowTop = window.pageYOffset + (window.innerHeight + 150);
  target.forEach(function (element) {
    if ((windowTop) > element.offsetTop) {
      element.classList.add('animate');
    } else {
      element.classList.remove('animate');
    }
  })
}

const debounce = (func, wait, immediate) => {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

animeScroll();

window.addEventListener('scroll', debounce(() => {
  animeScroll();
}, 100));

const buttoMobile = document.getElementById('button-mobile');
buttoMobile.addEventListener('click', toggleMenu);



const PETS_LENGTH = pets.length;
let slideNumber = 1;

// Burger Elements
const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.burger-close');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const overlay = document.querySelector('.overlay');

// Popup Elements
const slides = document.querySelectorAll('.slider-card');
const blackout = document.querySelector('.blackout');
const closeBtn = document.querySelector('.popup .close-btn');
const popup = document.querySelector('.popup');
const petImage = document.querySelector('.popup-image');
const petName = document.querySelector('.popup-content > .name');
const petType = document.querySelector('.popup-content > .type');
const petDescription = document.querySelector('.popup-content > .description');
const petAge = document.querySelector('.pet-info .age-info');
const petInoculations = document.querySelector('.pet-info .inoculations-info');
const petDiseases = document.querySelector('.pet-info .diseases-info');
const petParasites = document.querySelector('.pet-info .parasites-info');

// Pagination Elements
const btnFirst = document.querySelector('.btn-first');
const btnLast = document.querySelector('.btn-last');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const btnSlideNumber = document.querySelector('.btn-page');

// Burger EventListeners Handlers
function openMenu() {
  menu.style.display = 'inline-block';
  burger.style.transform = 'rotate(90deg)';
  burger.style.opacity = '0';
  logo.style.opacity = '0';
  document.body.style.overflowY = 'hidden';
  overlay.style.zIndex = '20';
  overlay.style.opacity = '1';
  overlay.style.display = 'inline-block';
  menu.style.zIndex = '30';
  setTimeout(() => {
    menu.style.right = '0';
    burgerClose.style.transform = 'rotate(90deg)';
  }, 0);
  setTimeout(() => {
    overlay.addEventListener('click', closeMenu);
    overlay.style.cursor = 'pointer';
  }, 1000);
}

function closeMenu() {
  overlay.removeEventListener('click', closeMenu);
  overlay.style.cursor = 'default';
  burger.style.transform = 'rotate(0deg)';
  burger.style.opacity = '1';
  burgerClose.style.transform = 'rotate(0deg)';
  logo.style.opacity = '1';
  document.body.style.overflowY = 'visible';
  document.body.style.overflowX = 'hidden';
  overlay.style.opacity = '0';
  setTimeout(() => {
    menu.style.display = 'none';
    overlay.style.zIndex = '-10';
    burgerClose.style.transform = 'rotate(0deg)';
    overlay.style.display = 'none';
  }, 1000);
  menu.style.right = '-320px';
  menu.style.zIndex = '-20';
}

// PopUp
function popupHandler(e) {
  let petId;
  if (e.target.classList.contains('slider-card')) {
    petId = e.target.dataset.id;
  } else if (e.target.parentElement.classList.contains('slider-card')) {
    petId = e.target.parentElement.dataset.id;
  } else {
    petId = e.target.parentElement.parentElement.dataset.id;
  }

  petImage.style.backgroundImage = `url("${pets[petId].img}")`;
  petName.innerText = pets[petId].name;
  petType.innerText = `${pets[petId].type} - ${pets[petId].breed}`;
  petDescription.innerText = pets[petId].description;
  petAge.innerText = pets[petId].age;
  petInoculations.innerText = pets[petId].inoculations.join(', ');
  petDiseases.innerText = pets[petId].diseases.join(', ');
  petParasites.innerText = pets[petId].parasites.join(', ');

  popup.classList.add('active');
  blackout.classList.add('active');
  disableScroll();
}

function closePopup() {
  popup.classList.remove('active');
  blackout.classList.remove('active');
  enableScroll();
}

// Pagination
function generate8x6Pets() {
  const result = {};
  for (let i = 1; i <= 6; i++) {
    const set = new Set();
    while (set.size < 8) {
      set.add(randomInteger(0, 7));
    }
    result[i] = [...set];
  }
  return result;
}

const pets8x6 = generate8x6Pets();

function generate6x8Pets() {
  const result = {};
  let remainder = [];
  let slide = 1;
  while (slide <= 8) {
    const set = new Set();
    while (set.size < 8) {
      set.add(randomInteger(0, 7));
    }
    const arr = [...set];
    let resultArr = [];

    if (remainder.length >= 6) {
      result[slide] = [...remainder.splice(0, 6)];
      slide++;
    } else if (remainder.length > 0) {
      resultArr.push(...remainder);
      remainder = [];
    }

    let arrIsFull = false;
    arr.forEach(el => {
      if (resultArr.length === 6) {
        result[slide] = [...resultArr];
        slide++;
        resultArr = [];
        arrIsFull = true;
      }
      if (!arrIsFull && !resultArr.includes(el)) resultArr.push(el);
      else remainder.push(el);
    });
    if (remainder.length >= 6) {
      result[slide] = [...remainder.splice(0, 6)];
      slide++;
    }
  }
  return result;
}

const pets6x8 = generate6x8Pets();

function generate3x16Pets() {
  const result = {};
  const pets = generate6x8Pets();
  Object.values(pets).forEach((arr, idx) => {
    result[idx * 2 + 1] = arr.slice(0, 3);
    result[idx * 2 + 2] = arr.slice(3);
  });
  return result;
}
const pets3x16 = generate3x16Pets();

function renderPets() {
  if (window.innerWidth >= 1280) {
    slides.forEach((slide, idx) => {
      const petIdx = pets8x6[slideNumber][idx];
      slide.dataset.id = petIdx;
      slide.querySelector('h4').innerText = pets[petIdx].name;
      slide.querySelector(
        '.card-image'
      ).style.backgroundImage = `url("${pets[petIdx].img}")`;
    });
  } else if (window.innerWidth >= 768) {
    slides.forEach((slide, idx) => {
      if (idx >= 6) return;
      const petIdx = pets6x8[slideNumber][idx];
      slide.dataset.id = petIdx;
      slide.querySelector('h4').innerText = pets[petIdx].name;
      slide.querySelector(
        '.card-image'
      ).style.backgroundImage = `url("${pets[petIdx].img}")`;
    });
  } else {
    slides.forEach((slide, idx) => {
      if (idx >= 3) return;
      const petIdx = pets3x16[slideNumber][idx];
      slide.dataset.id = petIdx;
      slide.querySelector('h4').innerText = pets[petIdx].name;
      slide.querySelector(
        '.card-image'
      ).style.backgroundImage = `url("${pets[petIdx].img}")`;
    });
  }
}

function resizeRender() {
  if (window.innerWidth >= 1280) {
    if (slideNumber > 6) {
      slideNumber = 6;
      lastSlide();
    }
  } else if (window.innerWidth >= 768) {
    if (slideNumber > 8) {
      slideNumber = 8;
      lastSlide();
    }
    if (slideNumber > 1 && slideNumber < 8) betweenSlide();
  } else {
    if (slideNumber > 1 && slideNumber < 16) betweenSlide();
  }
  btnSlideNumber.innerText = slideNumber;
  renderPets();
}

function openFirstSlide() {
  slideNumber = 1;
  btnSlideNumber.innerText = slideNumber;
  firstSlide();
  renderPets();
}

function openLastSlide() {
  if (window.innerWidth >= 1280) {
    slideNumber = 6;
  } else if (window.innerWidth >= 768) {
    slideNumber = 8;
  } else {
    slideNumber = 16;
  }
  btnSlideNumber.innerText = slideNumber;
  lastSlide();
  renderPets();
}

function openLeftSlide() {
  if (slideNumber === 1) return;
  betweenSlide();
  slideNumber--;
  if (slideNumber === 1) {
    firstSlide();
  }
  btnSlideNumber.innerText = slideNumber;
  renderPets();
}

function openRightSlide() {
  if (window.innerWidth >= 1280) {
    if (slideNumber === 6) return;
    if (slideNumber === 5) lastSlide();
    else betweenSlide();
  } else if (window.innerWidth >= 768) {
    if (slideNumber === 8) return;
    if (slideNumber === 7) lastSlide();
    else betweenSlide();
  } else if (window.innerWidth < 767) {
    if (slideNumber === 16) return;
    if (slideNumber === 15) lastSlide();
    else betweenSlide();
  }
  slideNumber++;
  btnSlideNumber.innerText = slideNumber;
  renderPets();
}

function lastSlide() {
  btnLast.classList.add('disabled');
  btnRight.classList.add('disabled');
  btnLast.classList.remove('active');
  btnRight.classList.remove('active');
  btnFirst.classList.add('active');
  btnLeft.classList.add('active');
  btnFirst.classList.remove('disabled');
  btnLeft.classList.remove('disabled');
}

function firstSlide() {
  btnLast.classList.add('active');
  btnRight.classList.add('active');
  btnLast.classList.remove('disabled');
  btnRight.classList.remove('disabled');
  btnFirst.classList.add('disabled');
  btnLeft.classList.add('disabled');
  btnFirst.classList.remove('active');
  btnLeft.classList.remove('active');
}

function betweenSlide() {
  btnLast.classList.add('active');
  btnRight.classList.add('active');
  btnLast.classList.remove('disabled');
  btnRight.classList.remove('disabled');
  btnFirst.classList.add('active');
  btnLeft.classList.add('active');
  btnFirst.classList.remove('disabled');
  btnLeft.classList.remove('disabled');
}

// Burger EventListeners
burger.addEventListener('click', openMenu);
burgerClose.addEventListener('click', closeMenu);

// Popup EventListeners
slides.forEach(slide => slide.addEventListener('click', popupHandler));
blackout.addEventListener('click', closePopup);
closeBtn.addEventListener('click', closePopup);

// Pagination EventListeners
btnFirst.addEventListener('click', openFirstSlide);
btnLast.addEventListener('click', openLastSlide);
btnLeft.addEventListener('click', openLeftSlide);
btnRight.addEventListener('click', openRightSlide);

function randomInteger(min, max) {
  // случайное число от min до (max + 1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
  document.body.style.overflow = null;
}

document.addEventListener('DOMContentLoaded', renderPets);
window.addEventListener('resize', resizeRender);

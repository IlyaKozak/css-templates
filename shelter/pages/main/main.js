const PETS_LENGTH = pets.length;

// Burger Elements
const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.burger-close');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const overlay = document.querySelector('.overlay');

//  Slider Elements
const slides = document.querySelectorAll('.slider-card');
const left = document.querySelector('.btn-active-left');
const right = document.querySelector('.btn-active-right');

// Popup Elements
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

// Burger EventListeners Handlers
function openMenu() {
  menu.style.display = 'inline-block';
  burger.style.transform = 'rotate(90deg)';
  burger.style.opacity = '0';
  logo.style.opacity = '0';
  document.body.style.overflowY = 'hidden';
  overlay.style.zIndex = '10';
  overlay.style.opacity = '1';
  overlay.style.display = 'inline-block';
  menu.style.zIndex = '20';
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

// Slider EventListeners Handlers
function slideRight() {
  const petsNums = generatePetsIds();
  slides.forEach((slide, idx) => {
    slide.style.transform = 'translateX(+150px)';
    slide.style.opacity = '0';
    setTimeout(() => {
      slide.style.transform = 'translateX(-150px)';
      slide.dataset.id = petsNums[idx];
      slide.querySelector('h4').innerText = pets[petsNums[idx]].name;
      slide.querySelector(
        '.card-image'
      ).style.backgroundImage = `url("${pets[petsNums[idx]].img}")`;
    }, 300);
    setTimeout(() => {
      slide.style.transform = 'translateX(0)';
      slide.style.opacity = '1';
    }, 600);
  });
}

function slideLeft() {
  const petsNums = generatePetsIds();
  slides.forEach((slide, idx) => {
    slide.style.transform = 'translateX(-150px)';
    slide.style.opacity = '0';
    setTimeout(() => {
      slide.style.transform = 'translateX(+150px)';
      slide.dataset.id = petsNums[idx];
      slide.querySelector('h4').innerText = pets[petsNums[idx]].name;
      slide.querySelector(
        '.card-image'
      ).style.backgroundImage = `url("${pets[petsNums[idx]].img}")`;
    }, 300);
    setTimeout(() => {
      slide.style.transform = 'translateX(0)';
      slide.style.opacity = '1';
    }, 600);
  });
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

function generatePetsIds() {
  const prevPets = [];
  const pets = new Set();
  slides.forEach(slide => prevPets.push(+slide.dataset.id));
  while (pets.size < 3) {
    const id = randomInteger(0, PETS_LENGTH - 1);
    if (prevPets.includes(id)) continue;
    pets.add(id);
  }
  return [...pets];
}

// Burger EventListeners
burger.addEventListener('click', openMenu);
burgerClose.addEventListener('click', closeMenu);

// Slider EventListeners
right.addEventListener('click', slideRight);
left.addEventListener('click', slideLeft);

// Popup EventListeners
slides.forEach(slide => slide.addEventListener('click', popupHandler));
blackout.addEventListener('click', closePopup);
closeBtn.addEventListener('click', closePopup);

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

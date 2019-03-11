// Initialize and add the map
function initMap() {
  // Your location
  const location = { lat: 53.9, lng: 27.56667 }; 
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: location
  });

  // The marker, positioned at location
  const marker = new google.maps.Marker({ position: location, map: map});
}

// Smooth Scrolling
// Constant OFFSET to compensate sticky navbar height
const OFFSET = 100;

$('#navbar a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - OFFSET
      },
      800
    );
  }
});

// Activates the current nav based on scroll position
let mainNavLinks = document.querySelectorAll("nav ul li a");

// Sticky navbar background opacity
window.addEventListener('scroll', function() {
  const fromTop = window.scrollY;

  if (fromTop > 150) {
    document.querySelector('#navbar').style.opacity = 0.9;
  }
  else {
    document.querySelector('#navbar').style.opacity = 1;
  }
  
  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
  
    if (
      section.offsetTop <= fromTop + OFFSET * 2 &&
      section.offsetTop + section.offsetHeight > fromTop + OFFSET * 2
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});
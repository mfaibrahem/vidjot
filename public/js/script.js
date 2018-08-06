const UImainHeader = document.querySelector('.main-header');
const UInavbarLI = document.querySelectorAll('.main-header > ul > li');
const UInavbarLIBtn = document.querySelector('.navbar-btn');
const UIHomeContainer = document.querySelector('.home-container');


callEventListeners ();

function callEventListeners () {
  UInavbarLIBtn.addEventListener('click', toggleNavbar);
}

function toggleNavbar() {
  UInavbarLI.forEach(li => {
    li.classList.toggle('view-navbar');
  });
  UImainHeader.classList.toggle('toggle-main-header');
  UInavbarLIBtn.classList.toggle('toggle-navbar-btn');
  UIHomeContainer.classList.toggle('toggle-home-container');
}
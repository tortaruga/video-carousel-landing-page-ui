const menuBtn = document.getElementById('menu-btn');
const menuIcon = document.querySelector('#menu-btn img');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileSocials = document.querySelector('.mobile-socials');

const menuIcons = {
    false: './assets/icons/menu.svg',
    true: './assets/icons/close.svg', 
};

let isOpen = false;

menuBtn.addEventListener('click', handleMenu);

function handleMenu() {
  isOpen = !isOpen; 
  menuIcon.setAttribute('src', menuIcons[isOpen]);

  mobileMenu.classList.toggle('open');
  mobileSocials.classList.toggle('open');
}
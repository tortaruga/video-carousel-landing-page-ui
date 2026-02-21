import { menuBtn, menuIcon, mobileMenu, mobileSocials } from "./DOMvars.js";

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
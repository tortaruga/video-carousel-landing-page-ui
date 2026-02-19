// on mouseenter make it visible
// on mouseleave hide it
// on mousemove update position

import { carouselBtns } from "./DOMvars.js"; 

const customCursor = document.getElementById('custom-cursor'); 

carouselBtns.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        customCursor.classList.add('show');
        
        if (e.currentTarget.id === 'prev') {
            customCursor.classList.add('prev');
            customCursor.classList.remove('next');
        } else if (e.currentTarget.id === 'next') {
            customCursor.classList.remove('prev');
            customCursor.classList.add('next');
        }
    })
})

carouselBtns.forEach(btn => btn.addEventListener('mouseleave', () => {
    customCursor.classList.remove('show'); 
}))

document.addEventListener('mousemove', (e) => {
    const x  = e.clientX;
    const y = e.clientY;
 
    // customCursor.style.transform = `translate(${x}px ${y}px)`; 
    customCursor.style.top = `${y}px`;
    customCursor.style.left = `${x}px`;
})
import { carouselBtns, customCursor } from "./DOMvars.js";  

carouselBtns.forEach(btn => {
    // show custom cursor when the button areas are hovered
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
    // hide the custom cursor when hovering away
    customCursor.classList.remove('show'); 
}))

// move custom cursor to follow the mouse
document.addEventListener('mousemove', (e) => {
    const x  = e.clientX;
    const y = e.clientY;
 
    customCursor.style.top = `${y}px`;
    customCursor.style.left = `${x}px`;
})
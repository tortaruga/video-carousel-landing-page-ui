import { carouselBtns } from "./DOMvars.js"; 

const vids = document.querySelectorAll('.carousel video');
const detailsDiv = document.querySelectorAll('.carousel .details');
const currentVidSpan = document.querySelectorAll('.currentVid'); 

const creditUser = document.getElementById('credit-user');
const creditSource = document.getElementById('credit-source');

let currentIndex = 1;
let slideWidth = window.innerWidth;
let startTranslateX = -slideWidth * currentIndex; 

const credits = [
    {user: "https://pixabay.com/it/users/tommyvideo-3092371/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", name: 'Tomislav Jakupec'},
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", name: 'Adis Resic'},
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=332743", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=332743", name: 'Adis Resic'},
    {user: "https://pixabay.com/it/users/tommyvideo-3092371/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", name: 'Tomislav Jakupec'},
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", name: 'Adis Resic'},
];

carouselBtns.forEach(btn => btn.addEventListener('click', (e) => handleCarousel(e)));

function wrapIndex(i, n) { 
    return (i % n + n) % n;
}

function updateCurrentVidSpan() {
    currentVidSpan.forEach(span => { 
        span.textContent = `0${currentIndex}`;  
        if (currentIndex === 0) {
            span.textContent = `0${vids.length - 2}`;  
        } 

        if (currentIndex === vids.length - 1) { 
            span.textContent = `01`;     
        }
    })
}

function slideVideo(transition) {
    
    if (transition) {
        vids.forEach(vid => {
            vid.style.transition = 'transform .6s';
        });

         detailsDiv.forEach(div => {
            div.style.transition = `transform .65s`;  
        })
    } else {
        vids.forEach(vid => {
            vid.style.transition = 'none';
        });

        detailsDiv.forEach(div => { 
            div.style.transition = `none`;  
        })
    }


    vids.forEach(vid => {
        vid.style.transform = `translateX(-${100 * currentIndex}vw)`;
    })

    detailsDiv.forEach(div => {
        div.style.transform = `translateX(-${100 * currentIndex}vw)`; 
    })

    // if id === 0, wait .65s and then slide to the last
    // if id === vids.length - 1 wait .65s then slide to first

    handleLoop();
}

function handleLoop() {
    if (currentIndex === 0) {
        setTimeout(() => {
            currentIndex = vids.length - 2;
            slideVideo(false);
        }, 650);
    }

    if (currentIndex === vids.length - 1) {
        setTimeout(() => { 
            currentIndex = 1;
            slideVideo(false);
        }, 650);
    }
}

function updateIndex(e) {
    if (e.currentTarget.id === 'prev') {
        currentIndex--;
        currentIndex = wrapIndex(currentIndex, vids.length);
    } else if (e.currentTarget.id === 'next') {
        currentIndex++;
        currentIndex = wrapIndex(currentIndex, vids.length);
    }
}

function handleCarousel(e) {
    updateIndex(e);
    slideVideo(true); 
    updateCurrentVidSpan();
    handleCredits();
}

function handleCredits() {
   creditUser.textContent = credits[currentIndex].name;
   creditUser.setAttribute('href', credits[currentIndex].user);
   creditSource.setAttribute('href', credits[currentIndex].source);
}
 
slideVideo(false);


// carousel navigation on mobile (swipe)

let startX;
let newTranslateX;
let isDragging = false;
 
function getClientX(e) {
  // Touch event
  if (e.touches && e.touches.length > 0) {
    return e.touches[0].clientX;
  }

  // Touchend
  if (e.changedTouches && e.changedTouches.length > 0) {
    return e.changedTouches[0].clientX;
  }

  // Mouse event
  return e.clientX;
}

function handleDragStart(e) { 
    startX = getClientX(e);   
    startTranslateX = -slideWidth * currentIndex;  
    isDragging = true;
}

vids.forEach(vid => { 
    vid.addEventListener('mousedown', handleDragStart);
    vid.addEventListener('touchstart', handleDragStart);
    vid.addEventListener('touchmove', handleDrag);
    vid.addEventListener('touchend', handleDragEnd);
})

window.addEventListener('mousemove', handleDrag);              
window.addEventListener('mouseup', handleDragEnd);  

function handleDrag(e) {

    if (isDragging) {
        const x = getClientX(e);
        newTranslateX = startTranslateX + (x - startX); 
          vids.forEach(vid => {
            vid.style.transition = 'none'; 
            vid.style.transform = `translateX(${newTranslateX}px)`;
        });
    
        detailsDiv.forEach(div => {      
            div.style.transition = `none`;     
            div.style.transform = `translateX(${newTranslateX}px)`; 
        }) 
    }
}


function handleDragEnd(e) {
    if (!isDragging) return;
    
    const x = getClientX(e);
    const delta = x - startX;

    if (delta > 50) {
        // go to to prev slide
        currentIndex--;
        currentIndex = wrapIndex(currentIndex, vids.length);

        vids.forEach(vid => {
            vid.style.transition = 'transform .6s';
            vid.style.transform = `translateX(-${100 * currentIndex}vw)`
        }) 

        detailsDiv.forEach(div => { 
            div.style.transition = 'transform .65s';
            div.style.transform = `translateX(-${100 * currentIndex}vw)`
        })

    } else if (delta < -50) { 
        // go next
        currentIndex++;
        currentIndex = wrapIndex(currentIndex, vids.length);
        vids.forEach(vid => {
            vid.style.transition = 'transform .6s';
            vid.style.transform = `translateX(-${100 * currentIndex}vw)` 
        })

        detailsDiv.forEach(div => { 
            div.style.transition = 'transform .65s';
            div.style.transform = `translateX(-${100 * currentIndex}vw)`
        })
    } else {
        // back to current 
        vids.forEach(vid => {
            vid.style.transition = 'transform .6s';
            vid.style.transform = `translateX(-${100 * currentIndex}vw)`
        })  

        detailsDiv.forEach(div => { 
            div.style.transition = 'transform .65s';
            div.style.transform = `translateX(-${100 * currentIndex}vw)` 
        })
    } 
 
    isDragging = false;  
    updateCurrentVidSpan();
    handleLoop();
}
 

window.addEventListener('resize', () => {
    slideWidth = window.innerWidth;
}) 
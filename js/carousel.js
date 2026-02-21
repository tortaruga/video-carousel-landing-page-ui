import { carouselBtns, detailsDiv, vids, creditSource, creditUser, currentVidSpan } from "./DOMvars.js";  
 
let currentIndex = 1;
let slideWidth = window.innerWidth;
let startTranslateX = -slideWidth * currentIndex; 

const credits = [
    {user: "https://pixabay.com/it/users/tommyvideo-3092371/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=125473", name: 'Marsel Sharipov'},
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=248449", name: 'Tung Lam'},
    {user: "https://pixabay.com/it/users/engin_akyurt-3656355/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=188078", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=188078", name: 'Engin Akyurt'},
    {user: "https://pixabay.com/it/users/tommyvideo-3092371/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=125473", name: 'Marsel Sharipov'},
    {user: "https://pixabay.com/it/users/tungart7-38741244/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=248449", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=248449", name: 'Tung Lam'},
];

// carousel logic
carouselBtns.forEach(btn => btn.addEventListener('click', (e) => handleCarousel(e)));

function handleCarousel(e) {
    updateIndex(e);
    slideVideo(true); 
    updateCurrentVidSpan();
    handleCredits();
}

function updateIndex(e) {
    // increment or decrement index + make sure it stays in the correct range
    if (e.currentTarget.id === 'prev') {
        currentIndex--;
        currentIndex = wrapIndex(currentIndex, vids.length);
    } else if (e.currentTarget.id === 'next') {
        currentIndex++;
        currentIndex = wrapIndex(currentIndex, vids.length);
    }
}

function wrapIndex(i, n) { 
    return (i % n + n) % n;
}

function slideVideo(transition) {
    //apply or remove transition
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
 

    // slide each video and details div
    // the details div is animated separately to allow for a slight delay that makes it visually interesting
    vids.forEach(vid => {
        vid.style.transform = `translateX(-${100 * currentIndex}vw)`;
    })

    detailsDiv.forEach(div => {
        div.style.transform = `translateX(-${100 * currentIndex}vw)`; 
    })

    handleLoop();
}

function handleLoop() {
    // if current slide is the "fake last" wait for the transition to end
      // and then jump to the real last slide
    if (currentIndex === 0) {
        setTimeout(() => {
            currentIndex = vids.length - 2;
            slideVideo(false);
        }, 650);
    }

    // if current slide is the "fake first" wait for the transition's end
      // and then jump to the real first slide
    if (currentIndex === vids.length - 1) {
        setTimeout(() => { 
            currentIndex = 1;
            slideVideo(false);
        }, 650);
    }
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

function handleCredits() {
   // display the correct credits for each video
   creditUser.textContent = credits[currentIndex].name;
   creditUser.setAttribute('href', credits[currentIndex].user);
   creditSource.setAttribute('href', credits[currentIndex].source);
}
 
// initialize the carousel (without transition)
slideVideo(false);


// carousel navigation on mobile (swipe)
let startX;
let newTranslateX;
let isDragging = false;

// handle both swipe on touch devices and click and drag on non-touch devices
vids.forEach(vid => { 
    vid.addEventListener('mousedown', handleDragStart);
    vid.addEventListener('touchstart', handleDragStart);
    vid.addEventListener('touchmove', handleDrag);
    vid.addEventListener('touchend', handleDragEnd);
})

window.addEventListener('mousemove', handleDrag);              
window.addEventListener('mouseup', handleDragEnd);
 
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

function handleDrag(e) {
    if (isDragging) {
        // start sliding the videos to give visual feedback
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
        // go to prev slide
        currentIndex--;
        currentIndex = wrapIndex(currentIndex, vids.length);
    } else if (delta < -50) { 
        // go to next slide
        currentIndex++;
        currentIndex = wrapIndex(currentIndex, vids.length);
    } 
        
    slideVideo(true);
 
    isDragging = false; 
    // wait for sliding to be over, then update index
    setTimeout(updateCurrentVidSpan, 600);  
}
  

// update slideWidth on window resize or sliding animation will look wacky
window.addEventListener('resize', () => {
    slideWidth = window.innerWidth;
}) 
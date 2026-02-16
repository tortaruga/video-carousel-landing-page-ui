const carouselBtns = document.querySelectorAll('.carousel button');
const vids = document.querySelectorAll('.carousel video');
const detailsDiv = document.querySelectorAll('.carousel .details');
const currentVidSpan = document.getElementById('currentVid');

const creditUser = document.getElementById('credit-user');
const creditSource = document.getElementById('credit-source');

let currentIndex = 0;

const credits = [
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=223439", name: 'Adis Resic'},
    {user: "https://pixabay.com/it/users/adisresic-9188734/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=332743", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=332743", name: 'Adis Resic'},
    {user: "https://pixabay.com/it/users/tommyvideo-3092371/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", source: "https://pixabay.com/it//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=5591", name: 'Tomislav Jakupec'},
];

carouselBtns.forEach(btn => btn.addEventListener('click', (e) => handleCarousel(e)));

function wrapIndex(i, n) { 
    return (i % n + n) % n;
}

function updateCurrentVidSpan() {
    currentVidSpan.textContent = `0${currentIndex + 1}`;
}

function slideVideo() {
    vids.forEach(vid => {
        vid.style.transform = `translateX(-${100 * currentIndex}vw)`;
    })

    detailsDiv.forEach(div => {
        div.style.transform = `translateX(-${100 * currentIndex}vw)`; 
    })
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
    slideVideo();
    updateCurrentVidSpan();
    handleCredits();
}

function handleCredits() {
   creditUser.textContent = credits[currentIndex].name;
   creditUser.setAttribute('href', credits[currentIndex].user);
   creditSource.setAttribute('href', credits[currentIndex].source);
}

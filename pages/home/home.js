//data file link
const landingPageSildingFileLink = "/json/landing_sliding.json";

//data store variable
let landingPageSlidingData = null;

function animateCharacters(container) {
  const elements = container.querySelectorAll(".char-animate");

  elements.forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.dataset.text = text;          // store original text
    el.innerHTML = "";               // clear previous chars

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;

      // 🔥 RevSlider-style stagger
      span.style.animationDelay = `${i * 0.06}s`;

      el.appendChild(span);
    });
  });
}

let fetchSlidingImageForLandingPage = async () =>{
  try{
    let response = await fetch(landingPageSildingFileLink);

    let data = await response.json();

    if(data)
      landingPageSlidingData = data;
  }
  catch (error){
    console.error("error during fetching the sliding page data", error);
  }
}

let loadSlidingHtmlData = (data) => {
  //selector
  const landingSlidingSelector = document.querySelector(".hero-slider");

  landingSlidingSelector.innerHTML = `
  <!-- Splash overlay -->
  <div class="slider-splash"></div>
  `;
  
  data.forEach(e => {
    landingSlidingSelector.innerHTML += `
      <div class="slide">
        <picture>
          <img src="${e.img}">
        </picture>

        <div class="slide-content">
          ${e.heading ? `<h1 class="char-animate">${e.heading}</h1>` : ``}
          ${e.subheading ? `<p class="char-animate delay-1">${e.subheading}</p>` : ``}
        </div>
      </div>
    `;
  });
}

async function initHeroSlider() {
  if(!landingPageSlidingData)
    await fetchSlidingImageForLandingPage();

  loadSlidingHtmlData(landingPageSlidingData);
  let current = 0;
  const slides = document.querySelectorAll(".hero-slider .slide");

  if (!slides.length) return;

  function activateSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    const activeSlide = slides[index];
    activeSlide.classList.add("active");

    // 🔥 Restart character animation every time
    animateCharacters(activeSlide);
  }

  activateSlide(current);

  setInterval(() => {
    current = (current + 1) % slides.length;
    activateSlide(current);
  }, 4500);
}

// RUN LENIS
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

console.log("testinglivecode")
// ALUMNI SLIDER
const swiperAlumni = new Swiper(".swiper.is-alumni-slider", {
  wrapperClass: "swiper_wrapper",
  slideClass: "swiper_slide",
  slidesPerView: 1.25,
  spaceBetween: 32,
  loop: true,
  centeredSlides: true,
  speed: 500,
  navigation: {
    nextEl: ".swiper_button.swiper-next",
    prevEl: ".swiper_button.swiper-back"
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true
  }
});

// TABS SLIDER
function initSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 767) {
    const tabs = new Swiper(".swiper.is-tabs", {
      wrapperClass: "swiper_wrapper",
      slideClass: "swiper_slide",

      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      spaceBetween: 32,
      loop: false,
      allowTouchMove: true
    });

    function handleTabClick(tabNumber) {
      tabs.slideTo(tabNumber);
    }

    for (let i = 0; i <= 3; i++) {
      const tabElement = document.getElementById(`tabs-slide-${i}`);
      tabElement.addEventListener("click", () => handleTabClick(i));
    }
  } else {
  }
}

// Call the function on page load
window.addEventListener("load", initSwiper);

// Call the function when the window is resized
window.addEventListener("resize", initSwiper);


// PLYR BACKGROUND VID
const backgroundVideoPlyr = Array.from(document.querySelectorAll("#backgroundVideo")).map(
  (p) =>
    new Plyr(p, {
      autoplay: true,
      muted: true,
      controls: false,
      loop: {
        active: true
      },
      settings: {
        controls: false
      }
    })
);

// PLYR VIDEO
const standardVideoPlyr = Array.from(document.querySelectorAll("#video")).map(
  (p) =>
    new Plyr(p, {
      captions: false
    })
);

// GSAP
gsap.registerPlugin(CustomEase, ScrollTrigger);

gsap.set(".container_hero", { opacity: 0 });
gsap.set("[data-herotext]", { opacity: 0, yPercent: 50 });
gsap.set("[data-herobutton]", { opacity: 0, scale: 0 });
gsap.set("[data-video]", { opacity: 0, scale: 0.8 });
gsap.set(".mini-card", { opacity: 0, yPercent: 80 });
gsap.set(".products_card", { opacity: 0, scale: 0.8 });

let headingText = new SplitType("[data-split]");

gsap.timeline()
  .to(".container_hero", { opacity: 1, duration: 0.4 })
  .from(headingText.chars, {
    opacity: 0,
    yPercent: "50",
    stagger: { amount: 0.2, from: "random" },
    ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.072,1.372,0.334,1.372,0.534,1.372,0.558,1.192,0.6,1,0.618,1.17,1,1.2,1,1.2"),
    duration: 0.8
  })

  .to("[data-herotext]",{
      opacity: 1,
      yPercent: 0,
      ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.072,1.176,0.334,1.176,0.534,1.176,0.558,0.996,0.6,0.804,0.618,0.974,1,1.004,1,1.004"),
      duration: 0.8
    }, "-=0.8"
  )
  .to("[data-herobutton]", {
      opacity: 1,
      scale: 1,
      ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.072,1.176,0.334,1.176,0.534,1.176,0.558,0.996,0.6,0.804,0.618,0.974,1,1.004,1,1.004"),
      duration: 0.8
    }, "-=0.8"
  )
  .to("[data-video]", {
      opacity: 1,
      scale: 1,
      ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.072,1.372,0.334,1.372,0.534,1.372,0.558,1.192,0.6,1,0.618,1.17,1,1.2,1,1.2"),
      duration: 0.8
    }, "-=0.8"
  );

// SECTION ANIMATION
const sectionAnimation = {
  opacity: 1,
  y: 0,
  ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.072,1.255,0.334,1.256,0.494,1.256,0.558,1.202,0.6,1.01,0.586,1.21,1,1.004,1,1.004")
};

document.querySelectorAll("[data-section]").forEach((section) => {
  gsap.from(section, {
    ...sectionAnimation,
    opacity: 0,
    duration: 1.2,
    y: 128,
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "bottom 90%",
      toggleActions: "play none none none"
    }
  });
});

// MINI CARDS
gsap.to(".mini-card", {
  opacity: 1,
  yPercent: "0",
  stagger: { amount: 0.2 },
  duration: 0.8,
  ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.06,1.284,0.325,1.284,0.528,1.284,0.56,1.208,0.603,1.016,0.621,1.186,1,1,1,1"),
  scrollTrigger: ".three-cards",
  start: "top 80%",
  markers: true
});

// PRODUCT CARDS
gsap.to(".products_card", {
  opacity: 1,
  scale: "1",
  stagger: { amount: 0.2 },
  duration: 0.8,
  ease: CustomEase.create("custom", "M0,0,C0.02,0.484,0.06,1.284,0.325,1.284,0.528,1.284,0.56,1.208,0.603,1.016,0.621,1.186,1,1,1,1"),
  scrollTrigger: ".products_card",
  start: "top 50%",
  markers: true
});

//HERO PARALLAX IMAGES
const heroImages = ["1", "2", "3", "4"];
heroImages.forEach((image, index) => {
  gsap.set(`[hero-img='${image}']`, { yPercent: 0 });
  gsap.to(`[hero-img='${image}']`, {
    scrollTrigger: {
      trigger: ".promo_header",
      start: "top 0",
      end: "top -100%",
      scrub: true
    },
    yPercent: -(index + 1) * 10
  });
});

// RANDOM ROTATION
const teamPhotos = document.querySelectorAll(".the-team_photo");
const alumniPhoto = document.querySelectorAll(".alumni_photo");

function getRandomNumber(min, max) {
  let randomNumber;
  do {
    randomNumber = Math.random() * (max - min) + min;
  } while (randomNumber === 0); // Repeat until the number is not 0
  return randomNumber;
}

function rotateElement(element, degrees) {
  element.style.transform = `rotate(${degrees}deg)`;
}

teamPhotos.forEach((element) => {
  const randomDegrees = Math.round(getRandomNumber(-3, 3));
  rotateElement(element, randomDegrees);
});

alumniPhoto.forEach((element) => {
  const randomDegrees = Math.round(getRandomNumber(-6, 6));
  rotateElement(element, randomDegrees);
});



// TRIAL CODE

const openTrialBtn = document.querySelectorAll('[data-trial="true"]');
const popupWindow = document.querySelector(".trial-popup_wrapper");
const popupSection = document.querySelector(".trial-popup_main");
const popupMain = document.querySelectorAll(".flip-wrapper");
const popupCloseBtn = document.querySelectorAll("[popup-close]");


// TRIAL SWIPER
const trialform = new Swiper(".swiper.is-popup", {
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 32,
  loop: false,
  allowTouchMove: false,
  navigation: {
    nextEl: ".button.next",
    prevEl: ".button.prev"
  },
  pagination: {
    el: ".swiper-pagination-wrapper",
    clickable: false
  }
});



// LAUNCH POUP
function showPopup() {

  popupWindow.classList.add("active");
  setTimeout(function () {
    popupSection.classList.add("active");
  }, 500);

  popupMain.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });
  changeVideo(true);

}

openTrialBtn.forEach((openTrialBtn) => {
  openTrialBtn.addEventListener("click", showPopup);
});

// CLOSE POPUP
function hidePopup() {

  popupSection.classList.remove("active");

  setTimeout(function () {
    popupWindow.classList.remove("active");
  }, 500);

  popupMain.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });

}

popupCloseBtn.forEach((popupCloseBtn) => {
  popupCloseBtn.addEventListener("click", hidePopup);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hidePopup();
  }
});

// TRIAL FORM



let firstNameInput, lastNameInput, emailInput, schoolNameInput, countryInput, postcodeInput;

function initializeInputs() {
  firstNameInput = document.getElementById("firstName").value;
  lastNameInput = document.getElementById("lastName").value;
  emailInput = document.getElementById("email").value;
  schoolNameInput = document.getElementById("schoolName").value;
  countryInput = document.getElementById("country").value;
  postcodeInput = document.getElementById("postcode").value;
}
initializeInputs();

// STEPS
function step1(event) {
  event.preventDefault();
  initializeInputs();
  console.log(firstNameInput);
  console.log(lastNameInput);
  console.log(emailInput);
  document.querySelectorAll("#form-text-name").forEach((element) => (element.textContent = firstNameInput));
  trialform.slideNext();
  changeVideo(true);
}

function step2(event) {
  event.preventDefault();
  initializeInputs();
  console.log(schoolNameInput);
  document.querySelectorAll("#form-text-school").forEach((element) => (element.textContent = schoolNameInput));
  trialform.slideNext();
  changeVideo(true);
}

function step3(event) {
  event.preventDefault();
  initializeInputs();
  trialform.slideNext();
  changeVideo(true);
}

function step4(event){
  event.preventDefault();

  const selectedLanguages = [];
  document.querySelectorAll('input[name="languages"]:checked').forEach((checkbox) => {
    selectedLanguages.push(checkbox.value);
  });

  // Join the selected languages into a single string, separated by a comma
  const selectedLanguagesString = selectedLanguages.join(', ');
  initializeInputs();
  console.log(countryInput);
  console.log(postcodeInput);
  document.querySelectorAll("#form-text-name").forEach((element) => (element.textContent = firstNameInput));
  document.querySelectorAll("#form-text-lastname").forEach((element) => (element.textContent = lastNameInput));
  document.querySelectorAll("#form-text-email").forEach((element) => (element.textContent = emailInput));
  document.querySelectorAll("#form-text-school").forEach((element) => (element.textContent = schoolNameInput));
  document.querySelectorAll("#form-text-country").forEach((element) => (element.textContent = countryInput));
  document.querySelectorAll("#form-text-postcode").forEach((element) => (element.textContent = postcodeInput));
  document.querySelectorAll("#form-text-subjects").forEach((element) => (element.textContent = selectedLanguagesString));
  changeVideo(true);
  trialform.slideNext();
}

function step5(event) {
  event.preventDefault();

  let selectedLanguages = [];
  document.querySelectorAll('input[name="languages"]:checked').forEach((checkbox) => {
  selectedLanguages.push(checkbox.value);
});

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    schoolName: document.getElementById("schoolName").value,
    country: document.getElementById("country").value,
    postcode: document.getElementById("postcode").value,
    couponCode: document.getElementById("couponCode").value,
    subjects: selectedLanguages
  };

  const apiUrl = "https://api.thisisschool.com/api/v1/website/forms/new-trial";

  fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://www.thisisschools.com"
      },
      body: JSON.stringify({
        formData
      })
    })
    .then((response) => {
      if (response.ok) {
        console.log("Success");

        document.querySelector(".flip-wrapper").classList.add("success");

        //CONFETTI

        const defaults = {
          spread: 360,
          ticks: 50,
          gravity: 0,
          decay: 0.94,
          startVelocity: 40,
          shapes: ["star"],
          colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"]
        };

        function shootFromLeft() {
          confetti({
            ...defaults,
            particleCount: 100,
            scalar: 1.2,
            shapes: ["star"],
            origin: {
              x: 0
            } 
          });
        }

        function shootFromRight() {
          confetti({
            ...defaults,
            particleCount: 100,
            scalar: 1.2,
            shapes: ["star"],
            origin: {
              x: 1
            }
          });
        }

        setTimeout(shootFromLeft, 0);
        setTimeout(shootFromRight, 100);
        setTimeout(shootFromLeft, 200);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Sorry an unexpected error has occured please try again or contact support");
    });
}

// NEXT STEP BUTTON
document.getElementById("wf-form-trialForm-1").addEventListener("submit", step1);
document.getElementById("wf-form-trialForm-2").addEventListener("submit", step2);
document.getElementById("wf-form-trialForm-3").addEventListener("submit", step3);
document.getElementById("wf-form-trialForm-4").addEventListener("submit", step4);
document.getElementById("wf-form-trialForm-5").addEventListener("submit", step5);

// COUPON CODE
const checkbox = document.getElementById("Couponcodecheckbox");
const checkboxContainer = document.querySelector(".popup-form_checkbox-container");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    checkboxContainer.style.height = "3.9rem";
  } else {
    checkboxContainer.style.height = "0";
  }
});

const label = document.querySelector(".popup-form_checkbox-wrapper");

label.addEventListener("click", function () {
  checkbox.checked = !checkbox.checked;
  const event = new Event("change");
  checkbox.dispatchEvent(event);
});

const allowLanguageCheckbox = document.getElementById('allowlanguage');
const languageWrapper = document.querySelector('.chip-language_wrapper');

allowLanguageCheckbox.addEventListener('change', function () {
    if (this.checked) {
        languageWrapper.style.gridTemplateRows = '1fr';
    } else {
        languageWrapper.style.gridTemplateRows = '0fr';
    }
});


// VIDEO
// Get references to the video element and the change video buttons
const video = document.getElementById('myVideo');
const changeVideoButton = document.getElementById('changeVideo');
const prevVideoButton = document.querySelectorAll('.button.prev');


// Array of video sources
const videoSources = [
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/651ab3ec9c9d9a09e73f02cc_video0.mp4.txt',
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/65158bb4ab825e770cedceba_video5.mp4.txt',
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/65158bb4e2d7721f0bea5daa_video1.mp4.txt',
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/65158bb435fc94c5fca769a2_video2.mp4.txt',
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/65158bb4388b33407a38a305_video3.mp4.txt',
  'https://uploads-ssl.webflow.com/64a545a3b7ba05bd07986119/65158bb525776fc2d3d4353e_video4.mp4.txt'
  
];

let currentVideoIndex = 0;

// Function to update the video source and reset playback
function changeVideo(forward) {
    if (forward) {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    } else {
        currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    }
    
    const nextVideoSource = videoSources[currentVideoIndex];
    
    // Preload the next video
    const preloadVideo = new Audio(nextVideoSource);
    preloadVideo.addEventListener('canplaythrough', () => {
        // When the next video is preloaded, swap the video source
        video.src = nextVideoSource;
        video.load();
        video.play();

        // Reset the playback to loop the last 2 seconds
        video.currentTime = video.duration - 2;

        // Remove the preloadVideo element to free up resources
        preloadVideo.remove();
    });

    // Start preloading the next video
    preloadVideo.load();
}

// Event listener for the 'ended' event to loop the video
video.addEventListener('ended', () => {
    video.currentTime = video.duration - 2; // Loop the last 2 seconds
    video.play();
});

// Initial setup to preload and autoplay the first video
video.load();
video.play();

document.querySelectorAll('[data-swiper-prev]').forEach(el => el.addEventListener('click', () => changeVideo(false)));
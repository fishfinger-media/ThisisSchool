// RUN LENIS
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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
      if (tabElement) {
        tabElement.addEventListener("click", () => handleTabClick(i));
      }
    }
  } else {
    // Handle the case when screenWidth is less than 767 if needed.
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


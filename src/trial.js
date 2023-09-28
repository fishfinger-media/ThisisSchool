const openTrialBtn = document.querySelectorAll('[data-trial="true"]');
const popupWindow = document.querySelector(".trial-popup_wrapper");
const popupSection = document.querySelector(".trial-popup_main");
const popupMain = document.querySelectorAll(".flip-wrapper");
const popupCloseBtn = document.querySelectorAll("[popup-close]");

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

// MAIN TRIAL CODE
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

// IMAGE TOGGLE
function toggleActiveImage(imageNumber) {
  const images = document.querySelectorAll(".trial-popup_media-content img");
  console.log(images);

  if (imageNumber >= 1 && imageNumber <= images.length) {
    images.forEach((image, index) => {
      if (index === imageNumber - 1) {
        image.classList.add("is-active");
      } else {
        image.classList.remove("is-active");
      }
    });
  } else {
    console.error("Invalid image number.");
  }
}

// STEPS
function step1(event) {
  event.preventDefault();
  initializeInputs();
  console.log(firstNameInput);
  console.log(lastNameInput);
  console.log(emailInput);
  document.querySelectorAll("#form-text-name").forEach((element) => (element.textContent = firstNameInput));
  trialform.slideNext();
  toggleActiveImage(2);
}

function step2(event) {
  event.preventDefault();
  initializeInputs();
  console.log(schoolNameInput);
  document.querySelectorAll("#form-text-school").forEach((element) => (element.textContent = schoolNameInput));

  trialform.slideNext();
  toggleActiveImage(3);
}

function step3(event) {
  event.preventDefault();
  initializeInputs();
  console.log(countryInput);
  console.log(postcodeInput);
  document.querySelectorAll("#form-text-name").forEach((element) => (element.textContent = firstNameInput));
  document.querySelectorAll("#form-text-lastname").forEach((element) => (element.textContent = lastNameInput));
  document.querySelectorAll("#form-text-email").forEach((element) => (element.textContent = emailInput));
  document.querySelectorAll("#form-text-school").forEach((element) => (element.textContent = schoolNameInput));
  document.querySelectorAll("#form-text-country").forEach((element) => (element.textContent = countryInput));
  document.querySelectorAll("#form-text-postcode").forEach((element) => (element.textContent = postcodeInput));
  trialform.slideNext();
  toggleActiveImage(4);
}

function step4(event) {
  event.preventDefault();

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    schoolName: document.getElementById("schoolName").value,
    country: document.getElementById("country").value,
    postcode: document.getElementById("postcode").value,
    couponCode: document.getElementById("couponCode").value
  };

  const apiUrl = "https://api.newthisislanguage.com/api/v1/website/forms/new-trial";

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
            } // Start from the left side
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
            } // Start from the right side
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

// VALIDATION
document.getElementById("wf-form-trialForm-1").addEventListener("submit", step1);
document.getElementById("wf-form-trialForm-2").addEventListener("submit", step2);
document.getElementById("wf-form-trialForm-3").addEventListener("submit", step3);
document.getElementById("wf-form-trialForm-4").addEventListener("submit", step4);

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

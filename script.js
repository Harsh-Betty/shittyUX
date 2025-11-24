/* horizontal scroll */
function initHorizontalScroll() {
  const horizontalContainer = document.querySelector(".horizontal-container");

  if (!horizontalContainer) return;

  let isScrolling = false;

  window.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return;

      isScrolling = true;

      horizontalContainer.scrollLeft += e.deltaY * 0.3;

      setTimeout(() => {
        isScrolling = false;
      }, 10);
    },
    { passive: true }
  );
}

/* menu animation */
function initShyMenu() {
  const shyNav = document.getElementById("shy-nav");
  if (!shyNav) return;

  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;
  let shyTimeout;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    scrollSpeed = Math.abs(currentScrollY - lastScrollY);

    if (currentScrollY < lastScrollY && scrollSpeed > 20) {
      shyNav.classList.add("shy-away");

      clearTimeout(shyTimeout);
      shyTimeout = setTimeout(() => {
        shyNav.classList.remove("shy-away");
      }, 500);
    }

    lastScrollY = currentScrollY;
  });
}

/* burger menu */
function initBurgerMenuRoulette() {
  const burgerMenu = document.getElementById("burger-menu");
  const menuPanel = document.getElementById("menu-panel");

  if (!burgerMenu || !menuPanel) return;

  let clickState = 0;

  burgerMenu.addEventListener("click", () => {
    clickState++;

    switch (clickState) {
      case 1:
        burgerMenu.style.opacity = "0.7";
        setTimeout(() => {
          burgerMenu.style.opacity = "1";
        }, 200);
        break;

      case 2:
        downloadPickle();
        break;

      case 3:
        menuPanel.classList.add("active");
        clickState = 0;
        break;
    }
  });

  document.addEventListener("click", (e) => {
    if (!burgerMenu.contains(e.target) && !menuPanel.contains(e.target)) {
      menuPanel.classList.remove("active");
    }
  });
}

function downloadPickle() {
  const pickleData = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200'%3E%3Cellipse cx='50' cy='100' rx='30' ry='80' fill='%2366cc66'/%3E%3Cellipse cx='35' cy='60' rx='8' ry='15' fill='%2355aa55'/%3E%3Cellipse cx='65' cy='80' rx='8' ry='15' fill='%2355aa55'/%3E%3Cellipse cx='40' cy='120' rx='8' ry='15' fill='%2355aa55'/%3E%3Cellipse cx='60' cy='140' rx='8' ry='15' fill='%2355aa55'/%3E%3C/svg%3E`;

  const link = document.createElement("a");
  link.href = pickleData;
  link.download = "pickle.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* toaster */
function initToaster() {
  const toasterContainer = document.getElementById("toaster-container");
  if (!toasterContainer) return;

  const uselessMessages = [
    "Your mouse moved.",
    "Pixel rendered successfully.",
    "badUX is watching.",
    "Time has passed.",
    "You blinked.",
    "CPU cycle completed.",
    "Your scroll position was recorded.",
    "Memory allocated.",
    "Nothing happened.",
    "The void stares back.",
    "Breathing detected.",
    "Internet connection... exists.",
    "Your cursor is being tracked.",
    "Random number generated: 7",
    "Status: Still here.",
    "Background process: existing.",
    "Font loaded (again).",
    "This notification serves no purpose.",
    "Congratulations on existing.",
    "The website is still working.",
  ];

  function createToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";

    const content = document.createElement("div");
    content.className = "toast-content";
    content.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast-close";
    closeBtn.textContent = "×";
    closeBtn.title = "Close (good luck clicking this)";

    closeBtn.addEventListener("click", () => {
      toast.style.animation = "slideIn 0.3s ease reverse";
      setTimeout(() => {
        toast.remove();
      }, 300);
    });

    toast.appendChild(content);
    toast.appendChild(closeBtn);
    toasterContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => {
          toast.remove();
        }, 300);
      }
    }, 6000);
  }

  function scheduleNextToast() {
    const interval = Math.random() * 10000 + 5000;

    setTimeout(() => {
      const randomMessage =
        uselessMessages[Math.floor(Math.random() * uselessMessages.length)];
      createToast(randomMessage);
      scheduleNextToast();
    }, interval);
  }

  setTimeout(() => {
    scheduleNextToast();
  }, 3000);
}

/* button swap */
function initButtonDemos() {
  const buttons = document.querySelectorAll(".btn-cancel, .btn-primary");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonText = button.textContent.trim();

      // Show which button was actually clicked
      alert(
        `You clicked: "${buttonText}"\n\nNotice the styling vs. the action!`
      );
    });
  });
}

/* random bold words */
function initRandomBold() {
  const paragraphs = document.querySelectorAll(".section-inner p");

  paragraphs.forEach((p) => {
    if (
      p.classList.contains("instructions") ||
      p.classList.contains("legal-text")
    )
      return;

    const words = p.textContent.split(" ");
    let newHTML = "";

    words.forEach((word) => {
      if (Math.random() < 0.1) {
        newHTML += `<strong>${word}</strong> `;
      } else {
        newHTML += `${word} `;
      }
    });

    p.innerHTML = newHTML.trim();
  });
}

function initPhoneSlider() {
  const slider = document.getElementById("phone-slider");
  const display = document.getElementById("phone-display");

  if (!slider || !display) return;

  slider.addEventListener("input", (e) => {
    display.textContent = e.target.value;
  });
}

function initAgeVerification() {
  const ageInput = document.getElementById("age-input");
  const ageError = document.getElementById("age-error");

  if (!ageInput || !ageError) return;

  ageInput.addEventListener("blur", () => {
    const value = parseInt(ageInput.value);

    if (value && value >= 3800 && value <= 4040 && value % 2 === 0) {
      ageError.classList.remove("show");
    } else if (ageInput.value.trim() !== "") {
      ageError.classList.add("show");
    }
  });
}

function initEmailValidation() {
  const emailInput = document.getElementById("email-input");
  const emailError = document.getElementById("email-error");

  if (!emailInput || !emailError) return;

  emailInput.addEventListener("blur", () => {
    const email = emailInput.value;

    if (email && email !== email.toLowerCase()) {
      emailError.classList.add("show");
    } else {
      emailError.classList.remove("show");
    }
  });
}

function initUnclickableCheckbox() {
  const fakeCheckbox = document.getElementById("fake-checkbox");
  const agreeInput = document.getElementById("agree-input");

  if (!fakeCheckbox || !agreeInput) return;

  fakeCheckbox.addEventListener("click", (e) => {
    e.preventDefault();
  });

  agreeInput.addEventListener("input", () => {
    if (agreeInput.value === "I AGREE") {
      fakeCheckbox.classList.add("checked");
    } else {
      fakeCheckbox.classList.remove("checked");
    }
  });
}

function initCountryDropdown() {
  const select = document.getElementById("country-select");

  if (!select) return;

  const countries = [
    "United States",
    "Canada",
    "Mexico",
    "United Kingdom",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Portugal",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Poland",
    "Czech Republic",
    "Australia",
    "New Zealand",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Argentina",
    "Chile",
    "Peru",
  ];

  const sortedCountries = [...countries].sort((a, b) => a.length - b.length);

  sortedCountries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.appendChild(option);
  });
}

function initFormSubmit() {
  const submitBtn = document.getElementById("submit-form");
  const resetBtn = document.getElementById("reset-form");

  if (!submitBtn || !resetBtn) return;

  submitBtn.addEventListener("click", () => {
    const phone = document.getElementById("phone-slider").value;
    const age = document.getElementById("age-input").value;
    const email = document.getElementById("email-input").value;
    const checkbox = document.getElementById("fake-checkbox");

    let message = "Form Status:\n\n";

    if (phone) message += `Phone: ${phone}\n`;
    if (age) message += `Age Math: ${age}\n`;
    if (email) message += `Email: ${email}\n`;
    if (checkbox.classList.contains("checked")) {
      message += "Terms: Agreed\n";
    } else {
      message += "Terms: Not agreed (type 'I AGREE')\n";
    }

    message +=
      "\n(This is the ACTUAL submit button, even though it looks like a text link)";

    alert(message);
  });

  resetBtn.addEventListener("click", () => {
    alert(
      "This is the ACTUAL reset button, even though it looks big and important!"
    );
    document.getElementById("phone-slider").value = "5000000000";
    document.getElementById("phone-display").textContent = "5000000000";
    document.getElementById("age-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("agree-input").value = "";
    document.getElementById("fake-checkbox").classList.remove("checked");
    document.getElementById("country-select").selectedIndex = 0;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHorizontalScroll();
  initShyMenu();
  initBurgerMenuRoulette();
  initToaster();
  initButtonDemos();
  initRandomBold();
  initPhoneSlider();
  initAgeVerification();
  initEmailValidation();
  initUnclickableCheckbox();
  initCountryDropdown();
  initFormSubmit();

  console.log(
    "%c shittyUX",
    "color: #ff4444; font-size: 20px; font-weight: bold; font-style: italic; font-family: comic sans ms;"
  );
});

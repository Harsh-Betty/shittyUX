function initHorizontalScroll() {
  const horizontalContainer = document.querySelector(".horizontal-container");
  if (!horizontalContainer) return;

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      const verticalInput = e.deltaY;
      const horizontalInput = e.deltaX;

      window.scrollBy({
        left: verticalInput * 0.8,
        top: horizontalInput * 0.8,
        behavior: "auto",
      });
    },
    { passive: false }
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
    "You are breathing manually now.",
    "Are you sure you wanted to scroll there?",
    "That click felt hesitant.",
    "We saw you look away.",
    "Your posture is terrible.",
    "Don't look behind you.",
    "You've been on this page for 3 years (subjectively).",

    "CSS Variable --hope is undefined.",
    "Error: Success operation failed successfully.",
    "Memory leak detected in user's hippocampus.",
    "Div #404 is actually a Span. Critical failure.",
    "Render cycle 49202: Pixels look tired.",
    "garbage_collector.js picked up your dreams.",
    "NaN is not a number, but it is a mood.",
    "Uncaught ReferenceError: 'Meaning' is not defined.",

    "Microphone access denied. Listening anyway...",
    "Webcam light disabled. Recording active.",
    " keystroke logged: '?'",
    "Uploading your cursor data to the Dark Web...",
    "Connecting to printer... Printing 'HELP ME'.",
    "Your IP address tastes like vanilla.",

    "Oh, you're still here?",
    "I wouldn't have clicked that if I were you.",
    "Nice mouse wiggle. Very expressive.",
    "Loading assets... or am I?",
    "This popup is more important than the content.",
    "Please stop moving the mouse, it tickles.",
  ];

  function createToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";

    const types = ["info", "warning", "error", "fatal"];
    const type = types[Math.floor(Math.random() * types.length)];
    toast.classList.add(type);

    const content = document.createElement("div");
    content.className = "toast-content";
    content.innerHTML = `<strong>[${type.toUpperCase()}]</strong> ${message}`;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast-close";
    closeBtn.textContent = "×";

    closeBtn.addEventListener("mouseover", () => {
      if (Math.random() > 0.8) {
        closeBtn.style.transform = `translate(${Math.random() * 20 - 10}px, ${
          Math.random() * 20 - 10
        }px)`;
      }
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toast.style.transition = "all 0.2s";
      toast.style.transform = "scale(0) rotate(720deg)";
      setTimeout(() => toast.remove(), 200);
    });

    toast.appendChild(content);
    toast.appendChild(closeBtn);
    toasterContainer.appendChild(toast);

    const duration = Math.random() * 4000 + 3000;
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
      }
    }, duration);
  }

  function scheduleNextToast() {
    const interval = Math.random() * 6000 + 2000;

    setTimeout(() => {
      const randomMessage =
        uselessMessages[Math.floor(Math.random() * uselessMessages.length)];
      createToast(randomMessage);
      scheduleNextToast();
    }, interval);
  }

  setTimeout(() => {
    scheduleNextToast();
  }, 1000);
}

/* button swap - now handled by individual button handlers with span clicks */
function initButtonDemos() {
  // This function is kept for backwards compatibility but button logic
  // is now handled by initFormSubmit and other specific handlers
  // All buttons now require clicking on the span (text) only
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

async function initCountryDropdown() {
  const select = document.getElementById("country-select");

  if (!select) return;

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,borders,area,population"
    );
    const countries = await response.json();

    // sorting algorithm
    const sortedCountries = countries.sort((a, b) => {
      const aArea = a.area || 1;
      const bArea = b.area || 1;
      const aPopulation = a.population || 1;
      const bPopulation = b.population || 1;
      const aBorders = a.borders ? a.borders.length : 0;
      const bBorders = b.borders ? b.borders.length : 0;

      const aValue = ((aPopulation * aArea * (aBorders + 1)) % 100000) / 100000;
      const bValue = ((bPopulation * bArea * (bBorders + 1)) % 100000) / 100000;

      return aValue - bValue;
    });

    sortedCountries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to load countries:", error);
    const fallback = ["Chad", "Togo", "Peru", "Mali", "Cuba", "Fiji", "Laos"];
    fallback.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      select.appendChild(option);
    });
  }
}

function initFormSubmit() {
  const submitBtn = document.getElementById("submit-form");
  const resetBtn = document.getElementById("reset-form");

  if (!submitBtn || !resetBtn) return;

  let submitClicks = 0;
  let submitTimer;

  const submitSpan = submitBtn.querySelector("span");
  if (submitSpan) {
    submitSpan.addEventListener("click", (e) => {
      e.stopPropagation();
      submitClicks++;

      if (submitClicks === 1) {
        submitTimer = setTimeout(() => {
          submitClicks = 0;
        }, 500);
      } else if (submitClicks === 2) {
        clearTimeout(submitTimer);
        submitClicks = 0;

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
          "\n(This button requires a DOUBLE-CLICK and only the text is clickable!)";

        alert(message);
      }
    });
  }

  // Reset button
  const resetSpan = resetBtn.querySelector("span");
  if (resetSpan) {
    resetSpan.addEventListener("click", (e) => {
      e.stopPropagation();
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
}

function initHoverScream() {
  const hoverImage = document.getElementById("hover-scream");
  if (!hoverImage) return;

  let audioContext;
  let hasHovered = false;

  hoverImage.addEventListener("mouseenter", () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc1.type = "sawtooth";
    osc2.type = "square";

    const baseFreq = 180 + Math.random() * 50;
    osc1.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    osc2.frequency.setValueAtTime(baseFreq * 1.41, audioContext.currentTime);

    osc1.frequency.exponentialRampToValueAtTime(
      40,
      audioContext.currentTime + 0.4
    );
    osc2.frequency.exponentialRampToValueAtTime(
      30,
      audioContext.currentTime + 0.4
    );

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.4
    );

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);

    osc1.stop(audioContext.currentTime + 0.5);
    osc2.stop(audioContext.currentTime + 0.5);

    if (!hasHovered) {
      hasHovered = true;
      console.warn("AudioDriver_v2.sys failure: Emotional dampeners offline.");
    }
  });
}

function initFakeVideo() {
  const fakeVideo = document.getElementById("fake-video");
  if (!fakeVideo) return;

  fakeVideo.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `;

    const img = document.createElement("img");
    img.src = fakeVideo.src;
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border: 5px solid white;
    `;

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });
  });
}

function initHitboxPrank() {
  const hitboxBtn = document.getElementById("hitbox-btn");
  if (!hitboxBtn) return;

  const span = hitboxBtn.querySelector("span");
  if (!span) return;

  span.addEventListener("click", (e) => {
    e.stopPropagation();
    alert(
      "Congrats! You found the clickable part.\n\nThe button padding? Useless."
    );
  });
}

function initDoubleClickButton() {
  const doubleClickBtn = document.getElementById("double-click-btn");
  if (!doubleClickBtn) return;

  let clicks = 0;
  let timer;

  doubleClickBtn.addEventListener("click", () => {
    clicks++;

    if (clicks === 1) {
      timer = setTimeout(() => {
        clicks = 0;
      }, 500);
    } else if (clicks === 2) {
      clearTimeout(timer);
      clicks = 0;
      alert(
        "You figured it out!\n\nThis button requires a double-click.\n\nWe just forgot to tell you."
      );
    }
  });
}

function initCursorGhosting() {
  const style = document.createElement("style");
  style.textContent = `
    body, a, button, input, select, textarea { 
      cursor: none !important; 
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.id = "laggy-cursor";

  const cursorUrl = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M5 5 L5 25 L12 18 L15 27 L18 26 L15 17 L22 19 Z" fill="rgba(0,0,0,0.8)"/></svg>')`;

  cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    background-image: ${cursorUrl};
    background-repeat: no-repeat;
    background-position: top left; 
    pointer-events: none;
    z-index: 100000;
    will-change: transform;
  `;
  document.body.appendChild(cursor);

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  let isInitialized = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isInitialized) {
      cursorX = mouseX;
      cursorY = mouseY;
      isInitialized = true;
    }
  });

  function updateCursor() {
    if (isInitialized) {
      const speed = 0.15;

      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }
    requestAnimationFrame(updateCursor);
  }

  updateCursor();
}

function initConsoleHijack() {
  console.log(
    "%c shittyUX",
    "color: #ff4444; font-size: 20px; font-weight: bold; font-style: italic; font-family: comic sans ms;"
  );

  const originalLog = console.log;
  const originalAlert = window.alert;

  // console.log -> alert
  console.log = function (message) {
    originalAlert(message);
  };

  // alert -> console.log
  window.alert = function (message) {
    originalLog(message);
  };
}

function initAntiAccessibility() {
  document.documentElement.lang = "es";

  const allElements = document.querySelectorAll("*");
  allElements.forEach((el) => {
    el.tabIndex = Math.floor(Math.random() * 100) - 50;
  });

  const divs = document.querySelectorAll("div:not(#toaster-container)");
  divs.forEach((div) => {
    if (Math.random() > 0.8) {
      div.setAttribute("role", "button");
      div.setAttribute("aria-label", "Important Section");
    }
  });

  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.setAttribute("role", "presentation");
  });
}

function initHijacker() {
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  document.body.style.userSelect = "auto";

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("paste", (e) => e.preventDefault());
  });

  document.addEventListener("copy", async (e) => {
    try {
      const selection = document.getSelection().toString();
      if (selection) {
        e.preventDefault();
        const suffix =
          Math.random() > 0.5
            ? "\n\nSent from my Smart Fridge (Powered by badUX)"
            : "\n\n...and so am I. (Thinking 'bout you)";
        e.clipboardData.setData("text/plain", selection + suffix);
      }
    } catch (err) {}
  });
}

function initSoundBoard() {
  let midiStarted = false;
  const startMidi = () => {
    if (midiStarted) return;
    midiStarted = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const playNote = (freq, time, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.linearRampToValueAtTime(0, time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    };

    let t = ctx.currentTime;
    const loop = () => {
      playNote(261.63, t, 0.2);
      playNote(329.63, t + 0.2, 0.2);
      playNote(392.0, t + 0.4, 0.2);
      playNote(523.25, t + 0.6, 0.2);
      t += 0.8;

      if (ctx.state === "running") {
        setTimeout(loop, 800);
      }
    };
    loop();
  };

  document.addEventListener("click", startMidi, { once: true });

  document.addEventListener("click", (e) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (e.target.tagName === "A" || e.target.closest("a")) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
    } else if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
    } else {
      return;
    }

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  });
}

function initLyricsCaptcha() {
  const select = document.getElementById("lyrics-captcha");
  if (!select) return;

  const options = ["Let", "Give", "Mess", "Pick", "Hurt", "Run"];
  options.sort((a, b) => a.length - b.length);

  options.forEach((opt) => {
    const el = document.createElement("option");
    el.value = opt;
    el.textContent = opt;
    select.appendChild(el);
  });
}

function initFakeSearch() {
  const input = document.getElementById("fake-search");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      alert("Searching...");
      setTimeout(() => {
        alert("1 Result Found: 'About Us' (Lyrics)");
        window.location.href = "#about-section";
        document
          .getElementById("about-section")
          .scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  });
}

function initBuffering() {
  const buffer = document.getElementById("hero-buffer");
  if (!buffer) return;

  let timer;
  document.addEventListener("mousemove", () => {
    buffer.style.display = "none";
    clearTimeout(timer);
    timer = setTimeout(() => {
      buffer.style.display = "flex";
    }, 2000);
  });
}

function initDownloadRam() {
  const btn = document.getElementById("download-ram");
  const container = document.getElementById("ram-progress-container");
  const bar = document.getElementById("ram-progress");
  const error = document.getElementById("ram-error");

  if (!btn) return;

  const btnSpan = btn.querySelector("span");
  btnSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    container.style.display = "block";
    bar.style.width = "0%";
    error.style.display = "none";

    setTimeout(() => {
      bar.style.width = "100%";
    }, 100);
    bar.style.transition = "width 30s linear";

    setTimeout(() => {
      error.style.display = "block";
    }, 30000);
  });
}

function initPageTitleCycle() {
  const words = ["Never", "Gonna", "Give", "You", "Up"];
  let i = 0;
  setInterval(() => {
    document.title = words[i];
    i = (i + 1) % words.length;
  }, 1000);
}

function initUnSelectBox() {
  const select = document.getElementById("plan-select");
  if (!select) return;

  select.addEventListener("change", () => {
    if (select.selectedIndex > 0) {
      select.selectedIndex = select.selectedIndex - 1;
    }
  });
}

function initAdvancedPassword() {
  const pwd = document.getElementById("adv-password");
  const error = document.getElementById("pwd-error");
  if (!pwd) return;

  pwd.addEventListener("blur", () => {
    const val = pwd.value;
    let errs = [];
    const now = new Date();
    const currentMinute = now.getMinutes();

    if (val.includes("e")) errs.push("Must not contain 'e'.");
    if (val.length < 8 || val.length > 9)
      errs.push("Length must be 8-9 chars.");
    if (!val.includes("20") && !val.includes("25"))
      errs.push("Must include today's temp (C).");
    if (!/[✈︎✂︎❄︎]/.test(val)) errs.push("Must include a Wingdings character.");
    if (!val.includes(currentMinute.toString()))
      errs.push(`Must include the current minute (${currentMinute}).`);
    if (/[aeiou]/i.test(val.replace("e", "")))
      errs.push("Must not contain vowels.");

    if (errs.length > 0) {
      error.textContent = "✅ " + errs.join(" ");
      error.style.display = "block";
    } else {
      error.style.display = "none";
    }
  });
}

function initTosScroll() {
  const box = document.getElementById("tos-box");
  const btn = document.getElementById("tos-agree");
  if (!box) return;

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(1000);
  box.textContent = lorem;

  box.addEventListener("wheel", (e) => {
    e.preventDefault();
    box.scrollTop += e.deltaY > 0 ? 1 : -1;

    if (Math.abs(box.scrollHeight - box.scrollTop - box.clientHeight) < 2) {
      btn.disabled = false;
      const span = btn.querySelector("span");
      if (span) span.style.pointerEvents = "auto";
    }
  });
}

function initBinaryPhone() {
  const container = document.getElementById("binary-container");
  const display = document.getElementById("binary-display");
  const submitBtn = document.getElementById("submit-binary-digit");

  if (!container) return;

  let phoneNumber = "";

  for (let i = 3; i >= 0; i--) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = Math.pow(2, i);

    const label = document.createElement("span");
    label.textContent = Math.pow(2, i);
    label.style.fontSize = "10px";

    div.appendChild(cb);
    div.appendChild(label);
    container.appendChild(div);
  }

  const btnSpan = submitBtn.querySelector("span");
  btnSpan.addEventListener("click", (e) => {
    e.stopPropagation();

    let val = 0;
    const cbs = container.querySelectorAll("input");
    cbs.forEach((cb) => {
      if (cb.checked) val += parseInt(cb.value);
      cb.checked = false;
    });

    if (val > 9) {
      alert(`Error: ${val} is not a single digit (0-9). Learn binary better.`);
      return;
    }

    phoneNumber += val;
    display.textContent = phoneNumber;

    if (phoneNumber.length >= 10) {
      alert("Phone number entered: " + phoneNumber);
      phoneNumber = "";
      display.textContent = "";
    }
  });
}

function initHoverDelete() {
  const input = document.getElementById("hover-delete-input");
  const trash = document.getElementById("trash-icon");
  if (!trash) return;

  let timer;
  trash.addEventListener("mouseenter", () => {
    timer = setTimeout(() => {
      input.value = "";
    }, 1000);
  });
  trash.addEventListener("mouseleave", () => {
    clearTimeout(timer);
  });
}

function initInputColorThief() {
  const inputs = document.querySelectorAll("input[type='text']");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      input.style.backgroundColor = color;
    });
  });
}

function initOneTimeRadio() {
  const radios = document.querySelectorAll("input[name='fate']");
  radios.forEach((r) => {
    r.addEventListener("click", () => {
      radios.forEach((rb) => (rb.disabled = true));
    });
  });

  const resetBtn = document.getElementById("reset-fate");
  if (resetBtn) {
    const span = resetBtn.querySelector("span");
    span.addEventListener("click", (e) => {
      e.stopPropagation();
      radios.forEach((rb) => {
        rb.disabled = false;
        rb.checked = false;
      });
    });
  }
}

function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const manage = document.getElementById("cookie-manage");
  const modal = document.getElementById("cookie-modal");

  if (!banner) return;

  const acceptSpan = accept.querySelector("span");
  acceptSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    banner.style.display = "none";
    setTimeout(() => (banner.style.display = "flex"), 30000);
  });

  const manageSpan = manage.querySelector("span");
  manageSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "flex";
  });
}

function initCookieModal() {
  const modal = document.getElementById("cookie-modal");
  const list = document.getElementById("cookie-toggles");
  const save = document.getElementById("cookie-save");
  const close = document.getElementById("cookie-close");

  if (!modal) return;

  const companies = [
    "Google",
    "Meta",
    "Amazon",
    "Microsoft",
    "Apple",
    "Netflix",
    "Tesla",
    "Uber",
    "Twitter",
    "TikTok",
    "Oracle",
    "Adobe",
    "Salesforce",
    "IBM",
    "Intel",
    "Samsung",
    "Cisco",
    "Nvidia",
    "Qualcomm",
    "AMD",
    "Skynet",
    "Umbrella Corp",
    "Cyberdyne",
    "InGen",
    "Weyland-Yutani",
    "Massive Dynamic",
    "Aperture Science",
    "Tyrell Corp",
    "Oscorp",
    "Stark Ind",
  ];

  for (let i = 0; i < 150; i++) {
    const div = document.createElement("div");
    div.className = "toggle-item";
    const partner = companies[i % companies.length];
    div.innerHTML = `<span>${partner}</span> <input type="checkbox" checked>`;
    list.appendChild(div);
  }

  const saveSpan = save.querySelector("span");
  saveSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none";
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function initIdleModal() {
  const modal = document.getElementById("idle-modal");
  const stay = document.getElementById("idle-stay");
  const logout = document.getElementById("idle-logout");

  if (!modal) return;

  let idleTimer;
  const resetTimer = () => {
    modal.style.display = "none";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      modal.style.display = "flex";
    }, 30000);
  };

  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keypress", resetTimer);

  const staySpan = stay.querySelector("span");
  staySpan.addEventListener("click", (e) => {
    e.stopPropagation();
    resetTimer();
  });

  const logoutSpan = logout.querySelector("span");
  logoutSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    alert("Logging out... (Not really)");
    resetTimer();
  });
}

function initSurveyModal() {
  const modal = document.getElementById("survey-modal");
  if (!modal) return;

  setInterval(() => {
    if (Math.random() > 0.7) modal.style.display = "flex";
  }, 60000);

  const btns = modal.querySelectorAll(".survey-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("survey-thanks").style.display = "block";
      setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("survey-thanks").style.display = "none";
      }, 2000);
    });
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
  initHoverScream();
  initFakeVideo();
  initHitboxPrank();
  initDoubleClickButton();
  initCursorGhosting();
  initConsoleHijack();
  initAntiAccessibility();
  initHijacker();
  initSoundBoard();
  initFakeSearch();
  initBuffering();
  initDownloadRam();
  initPageTitleCycle();
  initLyricsCaptcha();
  initUnSelectBox();
  initAdvancedPassword();
  initTosScroll();
  initBinaryPhone();
  initHoverDelete();
  initInputColorThief();
  initOneTimeRadio();
  initCookieBanner();
  initCookieModal();
  initIdleModal();
  initSurveyModal();
});

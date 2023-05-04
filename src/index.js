import "./styles.scss";

const en = [
  [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "Backspace",
  ],
  [
    "Tab",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "\\",
    "Del",
  ],
  ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  [
    "ShiftLeft",
    "\\",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
    "▲",
    "ShiftRight",
  ],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "◄", "▼", "►"],
];
const ru = [
  [
    "ё",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "Backspace",
  ],
  [
    "Tab",
    "й",
    "ц",
    "у",
    "к",
    "е",
    "н",
    "г",
    "ш",
    "щ",
    "з",
    "х",
    "ъ",
    "\\",
    "Del",
  ],
  ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
  [
    "ShiftLeft",
    "\\",
    "я",
    "ч",
    "с",
    "м",
    "и",
    "т",
    "ь",
    "б",
    "ю",
    ".",
    "▲",
    "ShiftRight",
  ],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "◄", "▼", "►"],
];
const languageMap = {
  en: en,
  ru: ru,
};
let isCapsLocked = false;
let isShifted = false;
let shiftLeft;
let shiftRight;
const root = document.createElement("main");
root.id = "keyboard";
document.body.append(root);
let keys;
let textarea;
let capsLock;
let currentLanguage;

function drawKeyboard(language, upperCase) {
  const keyboardBody = document.createElement("div");
  keyboardBody.classList.add("keyboard__body");
  for (let i = 0; i < language.length; i += 1) {
    const rowElement = document.createElement("div");
    rowElement.dataset.row = i;
    rowElement.classList.add("keyboard__row");
    keyboardBody.append(rowElement);
    for (let k = 0; k < language[i].length; k += 1) {
      const col = upperCase ? language[i][k].toUpperCase() : language[i][k];
      const colElement = document.createElement("div");
      colElement.innerText = upperCase ? col.toUpperCase() : col;
      colElement.dataset.row = i;
      colElement.dataset.col = k;
      colElement.dataset.key = col;
      colElement.classList.add("keyboard__col");
      if (col === "Backspace") {
        colElement.classList.add("key_size_backspace", "key-backspace");
      } else if (col === "Tab") {
        colElement.classList.add("key_size_tab", "key-tab");
      } else if (col === "Ctrl") {
        colElement.classList.add("key_size_l", "key-ctrl");
      } else if (col === "ShiftLeft") {
        colElement.classList.add("key_size_shift-left", "key-shift-left");
        colElement.innerText = "Shift";
      } else if (col === "ShiftRight") {
        colElement.classList.add("key_size_shift-right", "key-shift-right");
        colElement.innerText = "Shift";
      } else if (col === "Enter") {
        colElement.classList.add("key_size_xl", "key-enter");
      } else if (col === "CapsLock") {
        colElement.classList.add("key_size_xl", "key-capslock");
      } else if (col === "Space") {
        colElement.classList.add("key_size_xxxxl", "key-space");
      } else {
        colElement.classList.add("key_size_m");
      }
      rowElement.append(colElement);
    }
  }

  function drawApp() {
    const wrapper = document.createElement("div");
    const info = document.createElement("h4");
    info.innerText = "Переключение языка ShiftLeft + Alt \n ОС Windows";
    info.classList.add("info");
    root.classList.add("wrapper");
    textarea = document.createElement("textarea");
    textarea.classList.add("textarea");
    root.append(wrapper, textarea);
    drawKeyboard(languageMap[currentLanguage], isCapsLocked);
    root.append(info);
  }

  window.addEventListener("load", () => {
    const lang = localStorage.getItem("language");
    if (lang) {
      currentLanguage = lang;
    } else {
      currentLanguage = navigator.lang.slice(0, 2);
    }

    drawApp();
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("language", currentLanguage);
  });

  function changeKeyLanguage(lang) {
    for (const key of keys) {
      const letter = languageMap[lang][key.dataset.row][key.dataset.col];
      if (letter !== "ShiftRight" && letter !== "ShiftLeft") {
        key.innerText = letter;
      }
    }
  }

  function capslockedMode(isCaps) {
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i].innerText;

      if (
        key !== "CapsLock" &&
        key !== "Enter" &&
        key !== "Del" &&
        key !== "Shift" &&
        key !== "ShiftLeft" &&
        key !== "ShiftRight" &&
        key !== "Tab" &&
        key !== "Alt" &&
        key !== "Ctrl" &&
        key !== "Backspace" &&
        key !== "Space" &&
        key !== "Win"
      ) {
        keys[i].innerText = isCaps ? key.toUpperCase() : key.toLowerCase();
      }
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.altKey) {
      // currentLanguage === "en"
      //   ? (currentLanguage = "ru")
      //   : (currentLanguage = "en");
      currentLanguage = currentLanguage === "en" ? "ru" : "en";
      changeKeyLanguage(currentLanguage);
    }

    for (let i = 0; i < keys.length; i += 1) {
      if (
        keys[i].innerText === e.key ||
        keys[i].innerText.toLowerCase() === e.key
      ) {
        keys[i].classList.add("key-animation");
      }
    }
    if (e.key === "CapsLock") {
      isCapsLocked = !isCapsLocked;
      capsLock.classList.toggle("key-active");
      capslockedMode(isCapsLocked);
    }
    if (e.code === "ShiftLeft") {
      isShifted = !isShifted;
      shiftLeft.classList.add("key-active");
    }
    if (e.code === "ShiftRight") {
      isShifted = !isShifted;
      shiftRight.classList.add("key-active");
    }
  });

  root.addEventListener("click", (e) => {
    const div = e.target.closest("div");
    if (root.contains(div) && div.classList.contains("keyboard__col")) {
      if (e.target.innerText === "CapsLock") {
        capsLock.classList.toggle("key-active");
        isCapsLocked = !isCapsLocked;
        capslockedMode(isCapsLocked);
      } else if (e.target.innerText === "Space") {
        textarea.value += " ";
      } else if (e.target.dataset.key === "ShiftLeft") {
        shiftLeft.classList.toggle("key-active");
        isShifted = !isShifted;
      } else if (e.target.dataset.key === "ShiftRight") {
        shiftRight.classList.toggle("key-active");
        isShifted = !isShifted;
      } else if (e.target.dataset.key === "Enter") {
        textarea.value += "\n";
      } else {
        textarea.value += e.target.innerText;
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    for (let i = 0; i < keys.length; i += 1) {
      if (
        keys[i].innerText === e.key ||
        keys[i].innerText.toLowerCase() === e.key
      ) {
        keys[i].classList.remove("key-animation");
      }
    }
    if (e.code === "ShiftLeft") {
      isShifted = !isShifted;
      shiftLeft.classList.remove("key-active");
    }
    if (e.code === "ShiftRight") {
      isShifted = !isShifted;
      shiftRight.classList.remove("key-active");
    }
  });

  root.append(keyboardBody);
  keys = document.querySelectorAll(".keyboard__col");
  capsLock = document.querySelector(".key-capslock");
  shiftLeft = document.querySelector(".key-shift-left");
  shiftRight = document.querySelector(".key-shift-right");
}

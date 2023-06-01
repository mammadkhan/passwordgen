const slider = document.querySelector(".slider");
const charlength = document.querySelector(".character-length-digit");

const placeholder = document.querySelector(".placeholder");
const generatedPassword = document.querySelector(".generated-password");
const passwordCopiedMessage = document.querySelector(".password-copied");
const passwordCopy = document.querySelector(".password-copy");

const features = document.querySelectorAll(".feature");
const generate = document.querySelector(".generate");

const passwordFeatures = {
  length: 5,
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};

passwordCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(generatedPassword.textContent);
  passwordCopiedMessage.textContent = "COPIED";
  passwordCopiedMessage.style.opacity = "0";
});

slider.addEventListener("input", (e) => {
  slider.style.backgroundSize = `${(Number(e.target.value) * 100) / 20}%`;
  charlength.textContent = e.target.value;
  passwordFeatures.length = Number(e.target.value);
});

for (const feature of features) {
  feature.addEventListener("input", (e) => {
    if (e.target.checked) {
      passwordFeatures[e.target.id] = true;
    } else {
      passwordFeatures[e.target.id] = false;
    }
  });
}

generate.addEventListener("click", () => {
  if (Object.values(passwordFeatures).includes(true)) {
    placeholder.remove();
    generatedPassword.textContent = genPass();
  }
});

function genPass() {
  const specialChars = "£$&()*+[]@#^-_!?";
  // 4 - Symbols
  // 3 - Numbers
  // 2 - Lowercase
  // 1 - Uppercase

  const onFeatures = Object.keys(passwordFeatures).filter(
    (feature) => passwordFeatures[feature] === true
  );
  const password = Array.from(
    { length: passwordFeatures.length },
    () => onFeatures[Math.ceil(Math.random() * onFeatures.length - 1)]
  );
  for (let i = 0; i < password.length; i++) {
    if (password[i] === "uppercase") {
      password[i] = String.fromCharCode(Math.ceil(Math.random() * (90 - 65) + 65));
    } else if (password[i] === "lowercase") {
      password[i] = String.fromCharCode(Math.ceil(Math.random() * (122 - 97) + 97));
    } else if (password[i] === "numbers") {
      password[i] = String.fromCharCode(Math.ceil(Math.random() * (57 - 48) + 48));
    } else if (password[i] === "symbols") {
      password[i] = specialChars[Math.ceil(Math.random() * specialChars.length - 1)];
    }
  }
  return password.join("");
}

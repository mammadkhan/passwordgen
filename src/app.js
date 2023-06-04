const slider = document.querySelector(".slider");
const charlength = document.querySelector(".character-length-digit");

const placeholder = document.querySelector(".placeholder");
const generatedPassword = document.querySelector(".generated-password");
const passwordCopiedMessage = document.querySelector(".password-copied");
const passwordCopy = document.querySelector(".password-copy");
const features = document.querySelectorAll(".feature");
const generate = document.querySelector(".generate");

const passwordStrengthComment = document.querySelector(".password-strength-comment");
const passwordStrengthIndicators = document.querySelectorAll(".indicator-level");

const passwordFeatures = {
  length: 5,
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};

passwordCopy.addEventListener("click", () => {
  if (passwordCopiedMessage.textContent || !generatedPassword.textContent) return;
  navigator.clipboard.writeText(generatedPassword.textContent);
  passwordCopiedMessage.textContent = "COPIED";
  setTimeout(() => {
    passwordCopiedMessage.style.opacity = "0";
    setTimeout(() => {
      passwordCopiedMessage.textContent = "";
      passwordCopiedMessage.style.opacity = "1";
    }, 800);
  }, 800);
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
    for (const indicator of passwordStrengthIndicators) {
      indicator.style.backgroundColor = "transparent";
      indicator.style.border = "2px solid white";
    }
    const generated = genPass();
    placeholder.remove();
    generatedPassword.textContent = generated.pass;
    passwordStrengthComment.textContent = generated.strength;
  }
});

function genPass() {
  const specialChars = "£$&()*+[]@#^-_!?";

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

  //Pass Strength

  let passwordStrength = "";
  const strengthPoint = zxcvbn(password.join("")).score;

  if (strengthPoint <= 1) {
    passwordStrength = "TOO WEAK!";
  } else if (strengthPoint === 2) {
    passwordStrength = "WEAK";
  } else if (strengthPoint === 3) {
    passwordStrength = "MEDIUM";
  } else if (strengthPoint === 4) {
    passwordStrength = "STRONG";
  }

  if (strengthPoint <= 1) {
    passwordStrengthIndicators[0].style.border = "none";
    passwordStrengthIndicators[0].style.backgroundColor = "var(--strength-tooweak)";
  } else {
    for (let i = 0; i < strengthPoint; i++) {
      passwordStrengthIndicators[i].style.border = "none";
      passwordStrengthIndicators[i].style.backgroundColor =
        strengthPoint === 2
          ? "var(--strength-weak)"
          : strengthPoint === 3
          ? "var(--strength-medium)"
          : strengthPoint === 4
          ? "var(--strength-strong)"
          : null;
    }
  }

  return { pass: password.join(""), strength: passwordStrength };
}

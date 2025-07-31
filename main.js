const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('length');
const lengthDisplay = document.getElementById('length-display');

// Character sets
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

function getRandomChar(set) {
  return set[Math.floor(Math.random() * set.length)];
}

function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const useUpper = document.getElementById('upper').checked;
  const useLower = document.getElementById('lower').checked;
  const useNumber = document.getElementById('number').checked;
  const useSymbol = document.getElementById('symbol').checked;

  let validChars = '';
  if (useUpper) validChars += upperSet;
  if (useLower) validChars += lowerSet;
  if (useNumber) validChars += numberSet;
  if (useSymbol) validChars += symbolSet;

  if (!validChars) {
    output.value = "Select at least one option!";
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += getRandomChar(validChars);
  }

  output.value = password;
}

copyBtn.addEventListener('click', () => {
  if (output.value) {
    output.select();
    document.execCommand('copy');
    alert("Password copied to clipboard!");
  }
});

// Update length display text
lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
  generatePassword();
});

// Re-generate when any checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', generatePassword);
});

// Initial generation
generatePassword();
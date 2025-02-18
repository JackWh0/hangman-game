const wordEl = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-button")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
)

const figureParts = document.querySelectorAll(".figure-part")

const words = [
  "Afghanistan",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",

  "Brunei",
  "Brazil",
  "Cambodia",

  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Egypt",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Hungary",

  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",

  "Jamaica",
  "Japan",
  "Jordan",

  "Kazakhstan",
  "Kenya",
  "Kiribati",

  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Lebanon",
  "Libya",

  "Malaysia",
  "Morocco",
  "Maldives",
  "Mexico",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",

  "Pakistan",
  "Palau",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Palestine",

  "Qatar",
  "Singapore",

  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Turkmenistan",

  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uzbekistan",
  "Yemen",
  "Zimbabwe",
]

let selectedWord = words[Math.floor(Math.random() * words.length)].trim()

let playable = true

const correctLetters = []
const wrongLetters = []

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${checkIfItHasLetter(correctLetters, letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `

  const innerWord = wordEl.innerText.replace(/[ \n]/g, "")

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃"
    finalMessageRevealWord.innerText = ""
    popup.style.display = "flex"

    playable = false
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = "block"
    } else {
      part.style.display = "none"
    }
  })

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕"
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`
    popup.style.display = "flex"

    playable = false
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show")

  setTimeout(() => {
    notification.classList.remove("show")
  }, 2000)
}

// Makes it easier to read the if statements
function checkIfItHasLetter(origin, letter) {
  const letterLowerCase = letter.toLowerCase()
  const letterUpperCase = letter.toUpperCase()

  return origin.includes(letterLowerCase) || origin.includes(letterUpperCase)
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key

      if (checkIfItHasLetter(selectedWord, letter)) {
        if (!checkIfItHasLetter(correctLetters, letter)) {
          correctLetters.push(letter)

          displayWord()
        } else {
          showNotification()
        }
      } else {
        if (!checkIfItHasLetter(wrongLetters, letter)) {
          wrongLetters.push(letter)

          updateWrongLettersEl()
        } else {
          showNotification()
        }
      }
    }
  }
})

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true

  //  Empty arrays
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()

  updateWrongLettersEl()

  popup.style.display = "none"
})

displayWord()

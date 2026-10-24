'use strict';

const envelope = document.getElementById('envelope');
const openLetterButton = document.getElementById('open-letter');
const letterSection = document.getElementById('letter-section');
const showSurpriseButton = document.getElementById('show-surprise');
const surpriseSection = document.getElementById('surprise-section');

let letterOpened = false;
let surpriseOpened = false;

function revealSection(section) {
  section.classList.remove('hidden');
  section.inert = false;
  section.classList.remove('reveal');
  // Restart the reveal animation if the section is being shown again.
  void section.offsetWidth;
  section.classList.add('reveal');
}

openLetterButton.addEventListener('click', () => {
  if (letterOpened) {
    letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  letterOpened = true;
  openLetterButton.disabled = true;
  openLetterButton.setAttribute('aria-expanded', 'true');
  openLetterButton.innerHTML = 'Your letter is open <span aria-hidden="true">♡</span>';
  envelope.classList.add('open');

  // Let the envelope begin opening before the letter section appears.
  window.setTimeout(() => {
    revealSection(letterSection);
    letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    letterSection.focus({ preventScroll: true });
    openLetterButton.disabled = false;
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420);
});

showSurpriseButton.addEventListener('click', () => {
  if (surpriseOpened) {
    surpriseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  surpriseOpened = true;
  showSurpriseButton.setAttribute('aria-expanded', 'true');
  showSurpriseButton.textContent = 'A little surprise for you ♡';
  revealSection(surpriseSection);
  surpriseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  surpriseSection.focus({ preventScroll: true });
});

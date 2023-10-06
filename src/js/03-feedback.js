import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';

let state = {};

function saveFormState(e) {
  state[e.target.name] = e.target.value.trim();
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadFormState() {
  try {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      state = JSON.parse(savedState);
      Object.entries(state).forEach(([key, value]) => {
        form.elements[key].value = value;
      });
    }
  } catch ({ message }) {
    console.log(message);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(state);
  localStorage.removeItem(storageKey);
  event.target.reset();
}

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);
loadFormState();

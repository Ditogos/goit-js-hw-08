import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const updateLocalStorage = throttle(() => {
  const emailValue = form.elements.email.value;
  const messageValue = form.elements.message.value;
  stateSave = {
    email: emailValue,
    message: messageValue,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(stateSave));
}, 1000);

function fillFormLocalStorage() {
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  form.elements.email.value = savedState.email || '';
  form.elements.message.value = savedState.message || '';
}

fillFormLocalStorage();

form.addEventListener('input', updateLocalStorage);

form.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem(localStorageKey);
  form.reset();
  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
});

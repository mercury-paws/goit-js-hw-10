import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', promiseHandler);

function promiseHandler(event) {
  event.preventDefault();

  const inputDelay = document.querySelector('input[name="delay"]');
  const delay = parseInt(inputDelay.value);

  const inputState = document.querySelectorAll('input[name="state"]');
  let state;
  inputState.forEach(input => {
    if (input.checked) {
      state = input.value;
    }
  });

  if (!delay || !state || delay === '') {
    alert('Please fill in all fields');
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(Error());
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        color: 'green',
        message: `Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 2000,
      });
    })
    .catch(error => {
      iziToast.error({
        color: 'red',
        message: `Rejected promise in ${delay} ms`,
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 2000,
      });
    });
}

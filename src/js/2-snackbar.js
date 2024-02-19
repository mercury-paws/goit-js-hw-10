import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  const stateInputs = document.querySelectorAll('input[name="state"]');
  let state;
  stateInputs.forEach(input => {
    if (input.checked) {
      state = input.value;
    }
  });

  if (!delay || !state) {
    console.log('Please fill out all fields');
    return;
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
      iziToast.error({
        color: 'green',
        message: `Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 1000,
      });
    })
    .catch(error => {
      iziToast.error({
        color: 'red',
        message: `Rejected promise in ${delay} ms`,
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 1000,
      });
    });
}

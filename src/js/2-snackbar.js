import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const submitBtn = document.querySelector('button[type="submit"]');
const radioFulfilled = document.querySelector('input[value="fulfilled"]');
const radioRejected = document.querySelector('input[value="rejected"]');
const inputNumber = document.querySelector('input[name="delay"]');

function fulfilledPromiceHandler(event) {
  event.preventDefault();
}

function rejectedPromiceHandler(event) {
  event.preventDefault();
}

function submitBtnHandler(event) {
  event.preventDefault();
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve(
        iziToast.error({
          color: 'red',
          message: 'Fulfilled promise in ${delay}ms',
          position: 'topRight',
          progressBarColor: 'rgb(0, 255, 184)',
          timeout: `${delay}`,
        })
      );

      //
    } else {
      reject(
        iziToast.error({
          color: 'red',
          message: 'Rejected promise in ${delay}ms',
          position: 'topRight',
          progressBarColor: 'rgb(0, 255, 184)',
          timeout: `${delay}`,
        })
      );
    }
  }, ${delay});
});

// Registering promise callbacks
promise
  .then(value => console.log(value)) // "Success! Value passed to resolve function"
  .catch(error => console.log(error)) // "Error! Error passed to reject function"
  .finally(() => console.log('Promise settled')); // "Promise settled"

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const daysElement = document.querySelector('[data-days]');
const input = document.getElementById('datetime-picker');

let userSelectedDate = '';
startBtn.disabled = true;
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();
    const currentDateTimestamp = Date.now();
    if (userSelectedDate <= currentDateTimestamp) {
      iziToast.error({
        color: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 2000,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    console.log(userSelectedDate);
  },
});

startBtn.addEventListener('click', makeTick);

let interval;

function makeTick() {
  interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();
    if (ms <= 0) {
      clearInterval(interval);
      return;
    }
    updateClockFace(convertMs(ms));
  }, 1000);
  startBtn.disabled = true;
  input.setAttribute('disabled', 'true');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysElement.textContent = `${addLeadingZero(days)}`;
  hoursElement.textContent = `${addLeadingZero(hours)}`;
  minutesElement.textContent = `${addLeadingZero(minutes)}`;
  secondsElement.textContent = `${addLeadingZero(seconds)}`;
}

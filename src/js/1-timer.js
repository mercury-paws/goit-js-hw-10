import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const daysElement = document.querySelector('[data-days]');

let userSelectedDate = '';
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();
    const currentDateTimestamp = Date.now();
    if (userSelectedDate < currentDateTimestamp) {
      iziToast.show({
        theme: 'dark',
        message: 'Please choose a date in the future',
        position: 'center',
        progressBarColor: 'rgb(0, 255, 184)',
        timeout: 2000,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    console.log(userSelectedDate);
    let ms = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(ms);
    updateClockFace({ days, hours, minutes, seconds });
  },
});

startBtn.addEventListener('click', () => {
  let interval = setInterval(() => {
    let ms = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(ms);
    updateClockFace({ days, hours, minutes, seconds });
  }, 1000);
});

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
function updateClockFace({ days, hours, minutes, seconds }) {
  daysElement.textContent = `${days}`;
  hoursElement.textContent = `${hours}`;
  minutesElement.textContent = `${minutes}`;
  secondsElement.textContent = `${seconds}`;
}

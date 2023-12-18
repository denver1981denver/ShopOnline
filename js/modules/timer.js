const taimer = (timerBlock, deadline) => {
  // создание вёрстки
  timerBlock.insertAdjacentHTML('beforeend', `
<p class="timer__title">До конца акции:</p>
`);

  const timerWrapper = document.createElement('div');
  timerWrapper.classList.add('timer__wrapper');
  timerBlock.append(timerWrapper);

  const timerItemDays = document.createElement('p');
  timerItemDays.classList.add('timer__item', 'timer__item--days');
  const timerDay = document.createElement('span');
  timerDay.classList.add('timer__count', 'timer__count--days');
  const unitDay = document.createElement('span');
  unitDay.classList.add('timer__units', 'timer__units--days');
  timerItemDays.append(timerDay, unitDay);

  const timerItemHours = document.createElement('p');
  timerItemHours.classList.add('timer__item', 'timer__item--hours');
  const timerHour = document.createElement('span');
  timerHour.classList.add('timer__count', 'timer__count--hours');
  const unitHour = document.createElement('span');
  unitHour.classList.add('timer__units', 'timer__units--hours');
  timerItemHours.append(timerHour, unitHour);

  const timerItemMinutes = document.createElement('p');
  timerItemMinutes.classList.add('timer__item', 'timer__item--minutes');
  const timerMin = document.createElement('span');
  timerMin.classList.add('timer__count', 'timer__count--minutes');
  const unitMin = document.createElement('span');
  unitMin.classList.add('timer__units', 'timer__units--minutes');
  timerItemMinutes.append(timerMin, unitMin);

  const timerItemSeconds = document.createElement('p');
  timerItemSeconds.classList.add('timer__item', 'timer__item--seconds');
  const timerSec = document.createElement('span');
  timerSec.classList.add('timer__count', 'timer__count--seconds');
  const unitSec = document.createElement('span');
  unitSec.classList.add('timer__units', 'timer__units--seconds');
  timerItemSeconds.append(timerSec, unitSec);
  timerItemSeconds.style.display = 'none';

  timerWrapper.append(timerItemDays, timerItemHours, timerItemMinutes, timerItemSeconds);
// функция проверки на склонение
  const getWordDeclination = () => {
    const dataSec = timerSec.textContent[timerSec.textContent.length - 1];
    const dataMin = timerMin.textContent[timerMin.textContent.length - 1];
    const dataHour = timerHour.textContent[timerHour.textContent.length - 1];
    const dataDay = timerDay.textContent[timerDay.textContent.length - 1];

    if (dataDay === '1') {
      unitDay.textContent = 'день';
    }

    if (dataDay > 1 && dataDay < 5) {
      unitDay.textContent = 'дня';
    }

    if (dataDay > 1 || dataDay === '0' || timerDay.textContent === '11') {
      unitDay.textContent = 'дней';
    }

    if (dataDay === '0') {
      timerItemDays.style.display = 'none';
      timerItemSeconds.style.display = 'block';
    }

    if (dataHour === '1') {
      unitHour.textContent = 'час';
    }

    if (dataHour > 1 || dataHour === '0' || timerHour.textContent === '11') {
      unitHour.textContent = 'часов';
    }

    if (dataHour > 1 && dataHour < 5) {
      unitHour.textContent = 'часа';
    }

    if (dataMin === '1') {
      unitMin.textContent = 'минута';
    }

    if (dataMin > 1 || dataMin === '0' || timerMin.textContent === '11') {
      unitMin.textContent = 'минут';
    }

    if (dataMin > 1 && dataMin < 5) {
      unitMin.textContent = 'минуты';
    }

    if (dataSec === '1') {
      unitSec.textContent = 'секунда';
    }

    if (dataSec > 1 || dataSec === '0' || timerSec.textContent === '11') {
      unitSec.textContent = 'секунд';
    }

    if (dataSec > 1 && dataSec < 5) {
      unitSec.textContent = 'секунды';
    }
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days};
  };

  const start = () => {
    const timer = getTimeRemaining();

    timerSec.textContent = timer.seconds;
    timerDay.textContent = timer.days;
    timerHour.textContent = timer.hours;
    timerMin.textContent = timer.minutes;

    if (timer.minutes < 10) {
      timerMin.textContent = `0${timer.minutes}`;
    }

    if (timer.hours < 10) {
      timerHour.textContent = `0${timer.hours}`;
    }
    const intervalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);

      timerBlock.style.display = 'none';
    }

    getWordDeclination();
  };

  start();
};

export default taimer;

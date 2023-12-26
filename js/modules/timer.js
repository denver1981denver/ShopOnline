const taimer = (timerBlock, deadline) => {
  // массивы со склоняемыми словами
  const wordsDays = ['день', 'дня', 'дней'];
  const wordsHours = ['час', 'часа', 'часов'];
  const wordsMinutes = ['минута', 'минуты', 'минут'];
  const wordsSeconds = ['секунда', 'секунды', 'секунд'];


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

  const numWord = (value, words) => {
    value %= 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
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

    unitDay.textContent = timerDay.textContent = timer.days;
    timerHour.textContent = timer.hours;
    timerMin.textContent = timer.minutes;
    timerSec.textContent = timer.seconds;

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

    unitDay.textContent = numWord(timer.days, wordsDays);
    unitHour.textContent = numWord(timer.hours, wordsHours);
    unitMin.textContent = numWord(timer.minutes, wordsMinutes);
    unitSec.textContent = numWord(timer.seconds, wordsSeconds);
  };
  start();
};

export default taimer;

import taimer from './modules/timer.js';

document.addEventListener('DOMContentLoaded', () => {
  const timerBlock = document.querySelector('[data-timer-deadline]');

  if (timerBlock) {
    const timerDeadline = timerBlock.dataset.timerDeadline;
    taimer(timerBlock, timerDeadline);
  }
});



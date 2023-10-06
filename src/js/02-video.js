import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');
const player = new Vimeo(playerIframe);
const localStorageKey = 'videoplayer-current-time';

function saveCurrentTimeToLocalstorage(time) {
  localStorage.setItem('localStorageKey', JSON.stringify(time));
}

function restoreCurrentTimeFromLocalStorage() {
  const savedTime = localStorage.getItem('localStorageKey');
  if (savedTime) {
    return JSON.parse(savedTime);
  }
  return 0;
}

player.setCurrentTime(restoreCurrentTimeFromLocalStorage());

player.on(
  'timeupdate',
  throttle(data => {
    saveCurrentTimeToLocalstorage(data.seconds);
  }, 1000)
);

import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');
const player = new Vimeo(playerIframe);

function saveCurrentTimeToLocalstorage(time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
}

function restoreCurrentTimeFromLocalStorage() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
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

// player.setCurrentTime(localStorage.getItem(LOCAL_KEY) || 0);

// player.on('play', function () {
//   player.getVideoTitle().then(function (title) {
//     const currentTime = localStorage.getItem(LOCAL_KEY) || 0;

//     console.log('Video Title', title);
//     console.log('Curent time', currentTime);
//   });
// });

//   const throtledUpdateStorage = throttle(updateLocalStorage, 1000);
//   throtledUpdateStorage(curentTimeData);
// };

// player.on('play', onPlay);

// const updateLocalStorage = function (data) {
//   localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
// };

// const storedData = localStorage.getItem('videoplayer-current-time');
// if (storedData) {
//   const currentTimeData = JSON.parse(storedData);
//   const { seconds } = currentTimeData;

// player
//   .setCurrentTime(seconds)
//   .then(function (newSeconds) {
//     console.log('Pozition video: ', newSeconds, 'sekonds');
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         console.error(
//           'The time was less than 0 or more than the duration of the video'
//         );
//         break;

//       default:
//         console.error('Happend another error', error);
//         break;
//     }
//   });

// const player = new Player('vimeo-player', {
//   id: 19231868,
//   width: 640,
// });

// player.on('play', function () {
//   console.log('played the video!');
// });

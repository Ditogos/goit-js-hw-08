import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 19231868,
  width: 640,
});

player.on('play', function () {
  console.log('played the video!');
});

const onPlay = function (data) {
  const curentTimeData = {
    duration: data.duration,
    percent: data.percent,
    seconds: data.seconds,
  };

  const throtledUpdateStorage = throttle(updateLocalStorage, 1000);
  throtledUpdateStorage(curentTimeData);
};

player.on('play', onPlay);

const updateLocalStorage = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

const storedData = localStorage.getItem('videoplayer-current-time');
if (storedData) {
  const currentTimeData = JSON.parse(storedData);
  const { seconds } = currentTimeData;

  player
    .setCurrentTime(seconds)
    .then(function (newSeconds) {
      console.log('Pozition video: ', newSeconds, 'sekonds');
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.error(
            'The time was less than 0 or more than the duration of the video'
          );
          break;

        default:
          console.error('Happend another error', error);
          break;
      }
    });
}

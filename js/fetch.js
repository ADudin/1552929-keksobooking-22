import {getPoints} from './map.js';
import {showAlert} from './util.js';

const ADVERTISEMENT_COUNT = 10;

const createFetch = (onSuccess) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось получить данные с сервера');
    })
    .then((data) => {
      onSuccess(data.slice(0, ADVERTISEMENT_COUNT));
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
    });
}

const createAdvertisements = () => createFetch(
  (advertisements) => {
    getPoints(advertisements);
  },
);

const sendData = (onSuccess, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    }
    showAlert('Не удалось отправить данные формы на сервер');
  })
    .catch(() => {
      showAlert('Не удалось отправить данные формы на сервер');
    });
};

export {createAdvertisements, sendData};

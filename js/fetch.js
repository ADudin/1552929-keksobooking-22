import {getPoints} from './map.js';
import {showAlert} from './util.js';
import {renderMessage} from './popup.js';

const ADVERTISEMENT_COUNT = 10;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

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
      renderMessage(successTemplate);
    }
    renderMessage(errorTemplate);
  })
    .catch(() => {
      renderMessage(errorTemplate);
    });
};

export {createAdvertisements, sendData};

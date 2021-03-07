import {getPoints} from './map.js';
import {renderMessage} from './popup.js';

const ADVERTISEMENT_COUNT = 10;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const ALERT_SHOW_TIME = 10000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 100;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

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
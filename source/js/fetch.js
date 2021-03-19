import {getPoints, mapFilters, disableForm} from './map.js';
import {renderMessage, successTemplate, errorTemplate} from './popup.js';
import {getFilteredAdvertisements} from './filter.js';

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
      disableForm(mapFilters);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
      disableForm(mapFilters);
    });
}

const createAdvertisements = () => createFetch(
  (advertisements) => {
    getPoints(advertisements);
    getFilteredAdvertisements(advertisements);
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
    } else {
      renderMessage(errorTemplate);
    }
  })
    .catch(() => {
      renderMessage(errorTemplate);
    });
};

export {createAdvertisements, sendData};

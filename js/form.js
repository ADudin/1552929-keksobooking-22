import {sendData} from './fetch.js';
import {mainPinMarker, addressField} from './map.js';

const userForm = document.querySelector('.ad-form');
const type = userForm.querySelector('#type');
const price = userForm.querySelector('#price');
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');

type.addEventListener('change', () => {
  switch (type.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder = '0';
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder = '1000';
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = '5000';
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = '10000';
      break;
  }
});

timeIn.addEventListener('change', () => {
  switch (timeIn.value) {
    case '12:00':
      timeOut.options.selectedIndex = 0;
      break;
    case '13:00':
      timeOut.options.selectedIndex = 1;
      break;
    case '14:00':
      timeOut.options.selectedIndex = 2;
      break;
  }
});

timeOut.addEventListener('change', () => {
  switch (timeOut.value) {
    case '12:00':
      timeIn.options.selectedIndex = 0;
      break;
    case '13:00':
      timeIn.options.selectedIndex = 1;
      break;
    case '14:00':
      timeIn.options.selectedIndex = 2;
      break;
  }
});

const resetFormData = () => {
  userForm.reset();
  mainPinMarker.setLatLng({
    lat: 35.68170,
    lng: 139.75388,
  });
  addressField.value = '35.68170, 139.75388';
};

userForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  resetFormData();
});

const setFormSubmit = (onSuccess) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      new FormData(evt.target),
    );
  });
};

export {setFormSubmit, resetFormData};

import {sendData} from './fetch.js';
import {mainPinMarker, addressField} from './map.js';
import {clearPreview} from './photo.js';

const userForm = document.querySelector('.ad-form');
const type = userForm.querySelector('#type');
const price = userForm.querySelector('#price');
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');
const title = userForm.querySelector('#title');
const roomNumber = userForm.querySelector('#room_number');
const capacity = userForm.querySelector('#capacity');

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

title.addEventListener('input', () => {
  if (title.length < title.minlength) {
    title.setCustomValidity('Ещё '+ (title.length - title.minlength) + ' символов');
  }
  else if (title.length > title.maxlength) {
    title.setCustomValidity('Удалите лишние ' + (title.maxlength - title.length) + ' символов');
  }
  else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

const synchroniseRoomCapacity = () => {
  if (Number(roomNumber.value) === 100 && Number(capacity.value) !== 0) {
    capacity.setCustomValidity('Не верно указано количество гостей!');
  }
  else if (Number(capacity.value) === 0 && Number(roomNumber.value) !== 100) {
    capacity.setCustomValidity('Не верно указано количество гостей!');
  }
  else if (Number(roomNumber.value) < Number(capacity.value)) {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат!');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
};

roomNumber.addEventListener('change', synchroniseRoomCapacity);
capacity.addEventListener('change', synchroniseRoomCapacity);

const resetFormData = () => {
  userForm.reset();
  clearPreview();
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

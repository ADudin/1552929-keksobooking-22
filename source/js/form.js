import {sendData, createAdvertisements} from './fetch.js';
import {mainPinMarker, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, addressField, defaultAddress, mapFilters} from './map.js';
import {clearPreview} from './photo.js';

const userForm = document.querySelector('.ad-form');
const title = userForm.querySelector('#title');
const roomNumber = userForm.querySelector('#room_number');
const capacity = userForm.querySelector('#capacity');
const type = userForm.querySelector('#type');
const price = userForm.querySelector('#price');
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');
const resetUserForm = userForm.querySelector('.ad-form__reset');

const MIN_PRICE_MAP = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const MAX_ROOMS_QUANTITY_EXCESS_VALUE = 100;
const GEUSTS_ABSENCE_VALUE = 0;

type.addEventListener('change', () => {
  switch (type.value) {
    case 'bungalow':
      price.min = MIN_PRICE_MAP[type.value];
      price.placeholder = MIN_PRICE_MAP[type.value];
      checkPriceValidity();
      break;
    case 'flat':
      price.min = MIN_PRICE_MAP[type.value];
      price.placeholder = MIN_PRICE_MAP[type.value];
      checkPriceValidity();
      break;
    case 'house':
      price.min = MIN_PRICE_MAP[type.value];
      price.placeholder = MIN_PRICE_MAP[type.value];
      checkPriceValidity();
      break;
    case 'palace':
      price.min = MIN_PRICE_MAP[type.value];
      price.placeholder = MIN_PRICE_MAP[type.value];
      checkPriceValidity();
      break;
  }
});

const checkPriceValidity = () => {
  if (price.value < MIN_PRICE_MAP[type.value]) {
    price.setCustomValidity('Минимальная цена данного типа размещения ' + MIN_PRICE_MAP[type.value]);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
};

price.addEventListener('change', () => {
  checkPriceValidity();
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
  if (Number(roomNumber.value) === MAX_ROOMS_QUANTITY_EXCESS_VALUE && Number(capacity.value) !== GEUSTS_ABSENCE_VALUE) {
    capacity.setCustomValidity('Не верно указано количество гостей!');
  }
  else if (Number(capacity.value) === GEUSTS_ABSENCE_VALUE && Number(roomNumber.value) !== MAX_ROOMS_QUANTITY_EXCESS_VALUE) {
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
  mapFilters.reset();
  clearPreview();
  createAdvertisements();
  mainPinMarker.setLatLng({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  });
  addressField.value = defaultAddress;
};

resetUserForm.addEventListener('click', (evt) => {
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

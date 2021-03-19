import {isEscEvent} from './util.js';

const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const featuresFragment = document.createDocumentFragment();
const photosFragment = document.createDocumentFragment();

const mainContent = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const getRoomType = (type) => {
  if (type === 'palace') {
    return 'Дворец';
  }
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'house') {
    return 'Дом';
  }
  return 'Бунгало';
};

const getRoomsSignature = (number) => {
  if (number % 10 === 1) {
    return ' комната';
  }
  if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) {
    return ' комнаты';
  }
  return ' комнат';
};

const getGuestsSignature = (number) => {
  if (number % 10 === 1) {
    return ' гостя';
  }
  return ' гостей';
};

const removeAllChilds = (list) => {
  for (let i = list.children.length - 1; i >= 0; i--) {
    const child = list.children[i];
    child.parentElement.removeChild(child);
  }
};

const hideEmptyElement = (value, element) => {
  if (value === null) {
    element.classList.add('visually-hidden');
  }
};

const getPhotosFragment = (array) => {
  for (let i = 0; i < array.length; i++) {
    const photosElement = document.createElement('img');
    photosElement.classList.add('popup__photo');
    photosElement.src = array[i];
    photosElement.width = '45';
    photosElement.height = '40';
    photosElement.alt = 'Фотография жилья';

    photosFragment.appendChild(photosElement);
  }
  return photosFragment;
};

const getFeaturesFragment = (array) => {
  for (let i = 0; i < array.length; i++) {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');

    if (array[i] === 'wifi') {
      featuresElement.classList.add('popup__feature--wifi');
    }
    if (array[i] === 'dishwasher') {
      featuresElement.classList.add('popup__feature--dishwasher');
    }
    if (array[i] === 'parking') {
      featuresElement.classList.add('popup__feature--parking');
    }
    if (array[i] === 'washer') {
      featuresElement.classList.add('popup__feature--washer');
    }
    if (array[i] === 'elevator') {
      featuresElement.classList.add('popup__feature--elevator');
    }
    if (array[i] === 'conditioner') {
      featuresElement.classList.add('popup__feature--conditioner');
    }

    featuresFragment.appendChild(featuresElement);
  }
  return featuresFragment;
};

const renderAdvertisements = (advertisement) => {

  const advertisementElement = similarAdvertisementTemplate.cloneNode(true);
  const avatar = advertisementElement.querySelector('.popup__avatar');
  const title = advertisementElement.querySelector('.popup__title');
  const address = advertisementElement.querySelector('.popup__text--address');
  const price = advertisementElement.querySelector('.popup__text--price');
  const type = advertisementElement.querySelector('.popup__type');
  const capacity = advertisementElement.querySelector('.popup__text--capacity');
  const time = advertisementElement.querySelector('.popup__text--time');
  const description = advertisementElement.querySelector('.popup__description');
  const photosList = advertisementElement.querySelector('.popup__photos');
  const featuresList = advertisementElement.querySelector('.popup__features');

  removeAllChilds(photosList);
  removeAllChilds(featuresList);

  avatar.src = advertisement.author.avatar;
  title.textContent = advertisement.offer.title;
  address.textContent = advertisement.location.lat.toFixed(5) + ',' + advertisement.location.lng.toFixed(5);
  price.textContent = advertisement.offer.price + ' ₽/ночь';
  type.textContent = getRoomType(advertisement.offer.type);
  capacity.textContent = advertisement.offer.rooms + getRoomsSignature(advertisement.offer.rooms) + ' для ' + advertisement.offer.guests + getGuestsSignature(advertisement.offer.guests);
  time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  description.textContent = advertisement.offer.description;
  getPhotosFragment(advertisement.offer.photos);
  photosList.appendChild(photosFragment);
  getFeaturesFragment(advertisement.offer.features);
  featuresList.appendChild(featuresFragment);

  hideEmptyElement(advertisement.author.avatar, avatar);
  hideEmptyElement(advertisement.offer.title, title);
  hideEmptyElement(advertisement.offer.address, address);
  hideEmptyElement(advertisement.offer.price, price);
  hideEmptyElement(advertisement.offer.type, type);
  hideEmptyElement(advertisement.offer.rooms, capacity);
  hideEmptyElement(advertisement.offer.guests, capacity);
  hideEmptyElement(advertisement.offer.checkin, time);
  hideEmptyElement(advertisement.offer.checkout, time);
  hideEmptyElement(advertisement.offer.description, description);
  hideEmptyElement(photosList.children, photosList);
  hideEmptyElement(featuresList.children, featuresList);

  return advertisementElement;
};

const renderMessage = (template) => {
  const message = template.cloneNode(true);
  mainContent.appendChild(message);
  const closePopupButton = message.querySelector('.error__button');

  const closeMessage = () => {
    mainContent.removeChild(message);

    if (template === errorTemplate) {
      closePopupButton.removeEventListener('click', closeMessage);
    }

    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', closeMessage);
  };

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  if (template === errorTemplate) {
    closePopupButton.addEventListener('click', closeMessage);
  }

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeMessage);
};
export {renderAdvertisements, renderMessage, successTemplate, errorTemplate};

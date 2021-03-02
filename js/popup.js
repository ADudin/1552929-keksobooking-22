import {isEscEvent} from './util.js';

const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const featuresFragment = document.createDocumentFragment();
const photosFragment = document.createDocumentFragment();

const mainContent = document.querySelector('main');

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

const renderAdvertisements = (author, offer, location) => {
  const advertisementFragment = document.createDocumentFragment();

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

  avatar.src = author.avatar;
  title.textContent = offer.title;
  address.textContent = location.lat.toFixed(5) + ',' + location.lng.toFixed(5);
  price.textContent = offer.price + ' ₽/ночь';
  type.textContent = getRoomType(offer.type);
  capacity.textContent = offer.rooms + getRoomsSignature(offer.rooms) + ' для ' + offer.guests + getGuestsSignature(offer.guests);
  time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  description.textContent = offer.description;
  getPhotosFragment(offer.photos);
  photosList.appendChild(photosFragment);
  getFeaturesFragment(offer.features);
  featuresList.appendChild(featuresFragment);

  hideEmptyElement(author.avatar, avatar);
  hideEmptyElement(offer.title, title);
  hideEmptyElement(offer.address, address);
  hideEmptyElement(offer.price, price);
  hideEmptyElement(offer.type, type);
  hideEmptyElement(offer.rooms, capacity);
  hideEmptyElement(offer.guests, capacity);
  hideEmptyElement(offer.checkin, time);
  hideEmptyElement(offer.checkout, time);
  hideEmptyElement(offer.description, description);
  hideEmptyElement(photosList.children, photosList);
  hideEmptyElement(featuresList.children, featuresList);

  advertisementFragment.appendChild(advertisementElement);

  return advertisementFragment;
};

const renderMessage = (template) => {
  const message = template.cloneNode(true);
  mainContent.appendChild(message);
  const escHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      mainContent.removeChild(message);
    }
    document.removeEventListener('keydown', escHandler);
    document.removeEventListener('click', clickHandler);
  };
  const clickHandler = () => {
    mainContent.removeChild(message);
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', escHandler);
  };

  document.addEventListener('keydown', escHandler);
  document.addEventListener('click', clickHandler);
};
export {renderAdvertisements, renderMessage};

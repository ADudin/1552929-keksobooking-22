import {createSimilarAdvertisements} from './data.js';

const advertisementsList = document.querySelector('#map-canvas');
const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisements = createSimilarAdvertisements;
const similarListFragment = document.createDocumentFragment();

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

similarAdvertisements.forEach(({author, offer}) => {

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

  const photosFragment = document.createDocumentFragment();
  const featuresFragment = document.createDocumentFragment();

  avatar.src = author.avatar;
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = offer.price + ' ₽/ночь';
  type.textContent = getRoomType(offer.type);
  capacity.textContent = offer.rooms + getRoomsSignature(offer.rooms) + ' для ' + offer.guests + getGuestsSignature(offer.guests);
  time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  description.textContent = offer.description;

  for (let i = 0; i < offer.photos.length; i++) {
    const photosElement = document.createElement('img');
    photosElement.classList.add('popup__photo');
    photosElement.src = offer.photos[i];
    photosElement.width = '45';
    photosElement.height = '40';
    photosElement.alt = 'Фотография жилья';

    photosFragment.appendChild(photosElement);
  }
  photosList.appendChild(photosFragment);

  for (let i = 0; i < offer.features.length; i++) {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');

    if (offer.features[i] === 'wifi') {
      featuresElement.classList.add('popup__feature--wifi');
    }
    if (offer.features[i] === 'dishwasher') {
      featuresElement.classList.add('popup__feature--dishwasher');
    }
    if (offer.features[i] === 'parking') {
      featuresElement.classList.add('popup__feature--parking');
    }
    if (offer.features[i] === 'washer') {
      featuresElement.classList.add('popup__feature--washer');
    }
    if (offer.features[i] === 'elevator') {
      featuresElement.classList.add('popup__feature--elevator');
    }
    if (offer.features[i] === 'conditioner') {
      featuresElement.classList.add('popup__feature--conditioner');
    }

    featuresFragment.appendChild(featuresElement);
  }
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

  similarListFragment.appendChild(advertisementElement);
});

advertisementsList.appendChild(similarListFragment);

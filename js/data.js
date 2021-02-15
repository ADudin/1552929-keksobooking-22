import {getRandomInteger, getRandomFraction} from './util.js';

const TITLES = ['Тиёда', 'Синдзюку', 'Тосима', 'Бункё', 'Тайто', 'Кото', 'Минато', 'Аракава', 'Щибуя'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Замечательное', 'Уютное', 'Изумительное', 'Восхитительное', 'Потрясающее', 'Современное'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_ADVERTISEMENT_COUNT = 1;

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArray = (array) => {
  const randomArrayLength = getRandomInteger(1, 10);
  const newArray = [];
  for (let i = 0; i <= randomArrayLength; i++) {
    newArray.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return newArray;
};

const getRandomNoRepeatArray = (array) => {
  const randomArrayLength = getRandomInteger(0, array.length - 1);
  const newArray = [];
  for (let i = 0; i <= randomArrayLength; i++) {
    newArray.push(array.sort()[i]);
  }
  return newArray;
};

const getAdvertisement = () => {

  const randomAuthor = {
    avatar: 'img/avatars/user' + '0' + getRandomInteger(1, 8) + '.png',
  };

  const randomLocation = {
    latitude: getRandomFraction(35.65, 35.7, 5),
    longitude: getRandomFraction(139.7, 139.8, 5),
  };

  const randomOffer = {
    title: 'Аренда в ' + getRandomArrayElement(TITLES),
    address: randomLocation.latitude + ' северной широты, ' + randomLocation.longitude + ' восточной долготы',
    price: getRandomInteger(2000, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1,5),
    guests: getRandomInteger(1,10),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomNoRepeatArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS) + ' жильё!',
    photos: getRandomArray(PHOTOS),
  };

  return {
    author: randomAuthor,
    offer: randomOffer,
    location: randomLocation,
  };
};

const createSimilarAdvertisements = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => getAdvertisement());

export {createSimilarAdvertisements};

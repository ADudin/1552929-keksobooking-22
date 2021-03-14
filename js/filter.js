import {getPoints, mapFilters} from './map.js';

const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');

const getTypeFilter = (advertisement) => {
  if (housingType.value === 'any' || advertisement.offer.type === housingType.value) {
    return true;
  }
  return false;
};

const getRoomsFilter = (advertisement) => {
  if (housingRooms.value === 'any' || Number(advertisement.offer.rooms) === Number(housingRooms.value)) {
    return true;
  }
  return false;
};

const getGuestsFilter = (advertisement) => {
  if (housingGuests.value === 'any' || Number(advertisement.offer.rooms) === Number(housingGuests.value)) {
    return true;
  }
  return false;
};

const getPriceFilter = (advertisement) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  if (housingPrice.value === 'middle' && 10000 < advertisement.offer.price && 50000 >= advertisement.offer.price) {
    return true;
  }
  if (housingPrice.value === 'low' && 10000 >= advertisement.offer.price) {
    return true;
  }
  if (housingPrice.value === 'high' && 50000 <= advertisement.offer.price) {
    return true;
  }
  return false;
};

const getFeaturesFilter = (advertisement) => {
  const featureItems = mapFilters.querySelectorAll('.map__checkbox:checked');
  const featuresList = Array.from(featureItems).map((item) => item.value);
  return featuresList.every((item) => advertisement.offer.features.includes(item));
};

const getFilteredAdvertisements = (advertisements) => {
  mapFilters.addEventListener('change', () => {
    const filteredAdvertisents = advertisements.filter((advertisement) => {
      return getTypeFilter(advertisement) && getRoomsFilter(advertisement) && getGuestsFilter(advertisement) && getPriceFilter(advertisement) && getFeaturesFilter(advertisement);
    });
    return getPoints(filteredAdvertisents);
  });
}

export {getFilteredAdvertisements};

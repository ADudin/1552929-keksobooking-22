import {getPoints, mapFilters} from './map.js';

/* global _:readonly */
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');

const FILTER_LOW_PRICE = 10000;
const FILTER_MIDDLE_PRICE = 50000;
const RERENDER_DELAY = 500;

const getTypeFilter = (advertisement) => {
  return (housingType.value === 'any' || advertisement.offer.type === housingType.value);
};

const getRoomsFilter = (advertisement) => {
  return (housingRooms.value === 'any' || Number(advertisement.offer.rooms) === Number(housingRooms.value));
};

const getGuestsFilter = (advertisement) => {
  return (housingGuests.value === 'any' || Number(advertisement.offer.rooms) === Number(housingGuests.value));
};

const getPriceFilter = (advertisement) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  if (housingPrice.value === 'middle' && FILTER_LOW_PRICE <= advertisement.offer.price && FILTER_MIDDLE_PRICE >= advertisement.offer.price) {
    return true;
  }
  if (housingPrice.value === 'low' && FILTER_LOW_PRICE > advertisement.offer.price) {
    return true;
  }
  if (housingPrice.value === 'high' && FILTER_MIDDLE_PRICE < advertisement.offer.price) {
    return true;
  }
  return false;
};

const getFeaturesFilter = (advertisement) => {
  const featureItems = mapFilters.querySelectorAll('.map__checkbox:checked');
  const featuresList = Array.from(featureItems).map((item) => item.value);
  return featuresList.every((item) => advertisement.offer.features.includes(item));
};

const getGeneralFilter = (advertisements) => {

  const filteredAdvertisements = advertisements.filter((advertisement) => {

    return getTypeFilter(advertisement) &&
      getRoomsFilter(advertisement) &&
      getGuestsFilter(advertisement) &&
      getPriceFilter(advertisement) &&
      getFeaturesFilter(advertisement);

  });

  return filteredAdvertisements;
};

const getFilteredAdvertisements = (advertisements) => {

  mapFilters.addEventListener('change', _.debounce(() => {

    return getPoints(getGeneralFilter(advertisements));

  }, RERENDER_DELAY));
}

export {getFilteredAdvertisements};

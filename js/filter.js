import {getPoints, mapFilters} from './map.js';

const housingType = mapFilters.querySelector('#housing-type');

const typeFilter = (advertisements) => {
  housingType.addEventListener('change', () => {
    if (housingType.value === 'any') {
      return getPoints(advertisements);
    }
    const sameHousingTypeAdvertisements = advertisements.filter(advertisement => advertisement.offer.type === housingType.value);
    return getPoints(sameHousingTypeAdvertisements);
  });
};

export {typeFilter};

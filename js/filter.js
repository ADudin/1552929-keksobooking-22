import {getPoints, mapFilters} from './map.js';

const housingType = mapFilters.querySelector('#housing-type');

const typeFilter = (advertisements) => {
  housingType.addEventListener('change', () => {
    let sameHousingTypeAdvertisements = advertisements;
    if (housingType.value === 'any') {
      return getPoints(sameHousingTypeAdvertisements);
    }
    sameHousingTypeAdvertisements = advertisements.filter(advertisement => advertisement.offer.type === housingType.value);
    return getPoints(sameHousingTypeAdvertisements);
  });
};

export {typeFilter};

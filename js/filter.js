import {getPoints} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');

const typeFilter = (advertisements) => {
  housingType.addEventListener('change', () => {
    let sameHousingTypeAdvertisements = advertisements;
    if (housingType.value === 'any') {
      return getPoints(sameHousingTypeAdvertisements);
    }
    sameHousingTypeAdvertisements = advertisements.filter(advertisement => advertisement.offer.type === housingType.value);
    console.log(sameHousingTypeAdvertisements);
    return getPoints(sameHousingTypeAdvertisements);
  });
};

export {typeFilter};

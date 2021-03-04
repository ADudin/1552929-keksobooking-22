const getRandomInteger = (min, max) => {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }
  return 'Invalid range!';
};

const getRandomFraction = (min, max, fractionalSymbolsQuantity) => {
  if (min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(fractionalSymbolsQuantity);
  }
  return 'Invalid range!';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export {getRandomInteger, getRandomFraction, isEscEvent};

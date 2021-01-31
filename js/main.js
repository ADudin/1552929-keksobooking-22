const getRandomInteger = function (min, max) {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }
  return 'Invalid range!';
};

const getRandomFraction = function (min, max, fractionalSymbolsQuantity) {
  if (min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(fractionalSymbolsQuantity);
  }
  return 'Invalid range!';
};

getRandomInteger(12, 24);
getRandomFraction(1.6, 1.7, 3);

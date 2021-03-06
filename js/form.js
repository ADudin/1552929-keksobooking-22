const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const title = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

type.addEventListener('change', () => {
  switch (type.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder = '0';
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder = '1000';
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = '5000';
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = '10000';
      break;
  }
});

timeIn.addEventListener('change', () => {
  switch (timeIn.value) {
    case '12:00':
      timeOut.options.selectedIndex = 0;
      break;
    case '13:00':
      timeOut.options.selectedIndex = 1;
      break;
    case '14:00':
      timeOut.options.selectedIndex = 2;
      break;
  }
});

timeOut.addEventListener('change', () => {
  switch (timeOut.value) {
    case '12:00':
      timeIn.options.selectedIndex = 0;
      break;
    case '13:00':
      timeIn.options.selectedIndex = 1;
      break;
    case '14:00':
      timeIn.options.selectedIndex = 2;
      break;
  }
});

title.addEventListener('input', () => {
  const valueLength = title.length;
  if (valueLength < title.minlength) {
    title.setCustomValidity('Ещё '+ (valueLength - title.minlength) + ' символов');
  }
  else if (valueLength > title.maxlength) {
    title.setCustomValidity('Удалите лишние ' + (title.maxlength - valueLength) + ' символов');
  }
  else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

const synchroniseRoomCapacity = () => {
  if (Number(roomNumber.value) === 100 && Number(capacity.value) !== 0) {
    capacity.setCustomValidity('Не верно указано количество гостей!');
  }
  else if (Number(capacity.value) === 0 && Number(roomNumber.value) !== 100) {
    capacity.setCustomValidity('Не верно указано количество гостей!');
  }
  else if (Number(roomNumber.value) < Number(capacity.value)) {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат!');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
};

roomNumber.addEventListener('change', synchroniseRoomCapacity);
capacity.addEventListener('change', synchroniseRoomCapacity);

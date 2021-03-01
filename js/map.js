
import {renderAdvertisements} from './popup.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
addressField.value = '35.68170, 139.75388';
addressField.readOnly = true;

adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');

const disableForm = (form) => {
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].disabled = true;
  }
}

const enableForm = (form) => {
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].disabled = false;
  }
}

disableForm(adForm);
disableForm(mapFilters);

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm(adForm);
    enableForm(mapFilters);
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  })
  .setView({
    lat: 35.68170,
    lng: 139.75388,
  }, 11.7);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconanchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52,52],
  iconanchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68170,
    lng: 139.75388,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

const getPoints = (data) => {

  data.forEach((advertisement) => {
    const marker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        renderAdvertisements(advertisement.author, advertisement.offer, advertisement.location),
        {
          keepInView: true,
        },
      )
  });
};
export {getPoints, mainPinMarker, addressField};

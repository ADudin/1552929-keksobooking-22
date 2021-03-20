
import {renderAdvertisements} from './popup.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const DEFAULT_LATITUDE = 35.68170;
const DEFAULT_LONGITUDE = 139.75388;
const defaultAddress = DEFAULT_LATITUDE + ', ' + DEFAULT_LONGITUDE;
const PIN_ICON_WIDTH = 52;
const PIN_ICON_HEIGHT = 52;
const MAP_ZOOM_LEVEL = 11.7;
const ROUNDING_OF_COORDINATES_VALUE = 5;
const ADVERTISEMENT_COUNT = 10;

addressField.value = defaultAddress;
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
const pointsLayer = new L.LayerGroup();
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm(adForm);
    enableForm(mapFilters);
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  })
  .setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, MAP_ZOOM_LEVEL);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
  iconanchor: [PIN_ICON_WIDTH / 2, PIN_ICON_HEIGHT],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
  iconanchor: [PIN_ICON_WIDTH / 2, PIN_ICON_HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng().lat.toFixed(ROUNDING_OF_COORDINATES_VALUE) + ', ' + evt.target.getLatLng().lng.toFixed(ROUNDING_OF_COORDINATES_VALUE);
});

const getPoints = (data) => {
  pointsLayer.clearLayers();

  data.slice(0, ADVERTISEMENT_COUNT).forEach((advertisement) => {
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
      .bindPopup(
        renderAdvertisements(advertisement),
        {
          keepInView: true,
        },
      );
    pointsLayer.addLayer(marker);
  });
  pointsLayer.addTo(map);
};
export {
  getPoints,
  mainPinMarker,
  addressField,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  defaultAddress,
  mapFilters,
  disableForm
};

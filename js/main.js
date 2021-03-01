import './data.js';
import './map.js';
import {setFormSubmit, resetFormData} from './form.js';
import {createAdvertisements} from './fetch.js';
import './popup.js';

createAdvertisements();
setFormSubmit(resetFormData);

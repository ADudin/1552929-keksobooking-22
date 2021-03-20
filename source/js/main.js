import './map.js';
import {createAdvertisements} from './fetch.js';
import {setFormSubmit, resetFormData} from './form.js';
import './popup.js';
import './filter.js';

createAdvertisements();
setFormSubmit(resetFormData);

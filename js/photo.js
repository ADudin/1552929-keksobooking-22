const FILE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'image/svg'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const userAvatarChooser = document.querySelector('#avatar');
const userAvatarPreview = document.querySelector('.ad-form-header__preview');
const userHousingChooser = document.querySelector('#images');
const userHousingPreview = document.querySelector('.ad-form__photo');

const createImage = (alt, width, height) => {
  const image = document.createElement('img');
  image.alt = alt;
  image.width = width;
  image.height = height;

  return image;
};

const clearPreview = () => {
  const avatarImage = userAvatarPreview.querySelector('img');
  avatarImage.src = DEFAULT_AVATAR;
  userHousingPreview.innerHTML = '';
};

const uploadImage = (loader, preview) => {
  const typeMatch = FILE_TYPES.includes(loader.type);

  if (typeMatch) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(loader);
  }
};

userAvatarChooser.addEventListener('change', () => {
  const userAvatar = userAvatarChooser.files[0];
  const avatarPreview = userAvatarPreview.children[0];

  uploadImage(userAvatar, avatarPreview);
});
userHousingChooser.addEventListener('change', () => {
  userHousingPreview.appendChild(createImage('Фотография жилья', 70, 70));
  const housingPhoto = userHousingChooser.files[0];
  const photoPreview = userHousingPreview.children[0];

  uploadImage(housingPhoto, photoPreview);
});

export {clearPreview};

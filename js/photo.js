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
  const file = loader.files[0];
  const typeMatch = FILE_TYPES.includes(file.type);

  if (preview.children.length === 0 && typeMatch) {
    preview.appendChild(createImage('Фотография жилья', 70, 70));
  }

  if (typeMatch) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.children[0].src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

userAvatarChooser.addEventListener('change', () => {
  uploadImage(userAvatarChooser, userAvatarPreview);
});
userHousingChooser.addEventListener('change', () => {
  uploadImage(userHousingChooser, userHousingPreview);
});

export {clearPreview};

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова поп-апа (добавление карточки)
const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы (профиль пользователя)
const containerProfile = document.querySelector('.popup__container');
const containerFoto = document.querySelector('.popup__container-foto');
const formElementFoto = document.querySelector('.popup-foto'); // поп-ап для добавления карточки
const formProfileElement = document.querySelector('.popup__profile'); //присвоение переменной элемента - формы (профиль пользователя)
const forms = Array.from(document.querySelectorAll('.popup__form')); //массив из форм (для валидации)
const cardListSection = '.cards'; //контейнер для карточек
const popupEnlargement = document.querySelector('.popup-enlargement'); //поп-ап просмотра карточки (увеличенный вид)
const imgEnlargement = document.querySelector('.popup__img-enlargement'); // поле поп-апа для ссылки 
const titleEnlargement = document.querySelector('.popup__title-enlargement'); // поле поп-апа для названия фотографии
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"
const obj = { // объект настроек валидации
  inactiveButtonClass: 'popup__btn_disabled', //отключенная кнопка
  inputErrorClass: 'popup__input_type_error', // некорректные данные инпута (Нижняя рамка)
  errorClass: 'popup__error_visible' // информация об ошибке
}
const initialCards = [
  {
    name: 'Магадан',
    link: 'https://images.unsplash.com/photo-1570340831042-040b3999690c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1521398650514-170f902bb376?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Вологодская область',
    link: 'https://images.unsplash.com/photo-1568231582302-582041bd3a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80'
  },
  {
    name: 'Новосибирск',
    link: 'https://images.unsplash.com/photo-1530966449884-b130ce445fb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Хакасия',
    link: 'https://images.unsplash.com/photo-1587730730093-0405a91c5436?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1557023082-34ecc3b974b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
  }
];

import './index.css'; 

const initialValidatorProfile = new FormValidator(obj, containerProfile); //экземпляр для очистки полей профиля от ошибок

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
  initialValidatorProfile.clearError(formProfileElement);
 // console.log(formUser.getUserInfo());
  formUser.getUserInfo();
  formSubmitHandler.open();
  evt.preventDefault();
}
const formUser = new UserInfo({ //экземпляр для создания новой карточки пользователя
  title: '.profile-info__title',
  subtitle: '.profile-info__subtitle'
}, nameInput, jobInput);

const formSubmitHandler = new PopupWithForm(formProfileElement, { // добавляем данные пользователя на страницу
  handleFormSubmit: (item) => {
    formUser.setUserInfo(item.name, item.work);
  }
});

const initialValidatorFoto = new FormValidator(obj, containerFoto); //экземпляр для очистки полей карточки от ошибок

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
  initialValidatorFoto.clearError(formElementFoto);
  form.open();
}

function startingValidation() { //функция находит формы и запускает валидацию для каждой формы.
  forms.forEach((form) => {
    const sharedValidator = new FormValidator(obj, form);
    sharedValidator.enableValidation();
  });
}

const popupImage = new PopupWithImage(popupEnlargement, imgEnlargement, titleEnlargement);  //экземпляр для карточки из массива
//функция создания карточки (из массива)
function takesCards(item) {
  const cardInit = new Card(item.name, item.link, {
    handleCardClick: () => {
      popupImage.open(item.name, item.link);
    }
  });
  const cardElement = cardInit.generateCard();
  return cardElement;
}

const cardsList = new Section({ //добавляем карточки из массива на страницу
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(takesCards(item));
  },
},
  cardListSection
);

const popupAddImage = new PopupWithImage(popupEnlargement, imgEnlargement, titleEnlargement);  //экземпляр для новой карточки
//функция создания новой карточки 
function addСards(item) {
  const cardProf = new Card(item.title, item.link, {
    handleCardClick: () => { popupAddImage.open(item.title, item.link) }
  });
  const cardElement = cardProf.generateCard();
  return cardElement;
}

const form = new PopupWithForm(formElementFoto, { //добавляем новые фотографии на страницу
  handleFormSubmit: (item) => {
    cardsList.addItem(addСards(item));
  }
});

cardsList.renderItems(); // запускаем рисовку карточек из массива
openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
startingValidation(); // запускаем валидацию 

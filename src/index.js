import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import { obj } from './utils/constants.js';
import { initialCards } from './utils/constants.js';
import { cardListSection } from './utils/constants.js';
import { openBtn } from './utils/constants.js';
import { formProfileElement } from './utils/constants.js';
import { infoTitle } from './utils/constants.js';
import { infoSubtitle } from './utils/constants.js';
import { nameInput } from './utils/constants.js';
import { jobInput } from './utils/constants.js';
import { formElementFoto } from './utils/constants.js';
import { openBtnAdd } from './utils/constants.js';
import { forms } from './utils/constants.js';

function clearError(elem) { // функция удаляет ошибки перед открытием поп-апа и генерирует состояние кнопок
  const bugInput = Array.from(elem.querySelectorAll('.popup__input'));
  const buttonElement = elem.querySelector('.popup__btn');
  const container = elem.querySelector('.popup__container');
  elem.firstElementChild.reset();
  const initialValidator = new FormValidator(obj, container);
  bugInput.forEach((inputElement) => {
    initialValidator._hideInputError(inputElement); //удаляем текст ошибок и нижнее подчеркивание
  });
  initialValidator._toggleButtonState(bugInput, buttonElement); //делаем кнопку активной/пассивной
}

function overlay(e) { // функция оверлэй
  const allPop = Array.from(document.querySelectorAll('.popup')); //массив поп-апов
  if (e.target.classList.contains('popup')) {
    allPop.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        const overPop = new Popup(popup);
        overPop.close();
      }
    });
  }
}

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
  clearError(formProfileElement); // очищаем поля от ошибок 
  const openPro = new Popup(formProfileElement); //создаем экземпляр для открытия/закрытия поп-апа
  openPro.open();
  evt.preventDefault();
  nameInput.value = infoTitle.textContent;  // возвращаем актуальные значения полей 
  jobInput.value = infoSubtitle.textContent;
}

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
  const openFoto = new Popup(formElementFoto);
  openFoto.open();
  clearError(formElementFoto);
}

function startingValidation() { //функция находит формы и запускает валидацию для каждой формы.
  forms.forEach((form) => {
    const sharedValidator = new FormValidator(obj, form);
    sharedValidator.enableValidation();
  });
}

const cardsList = new Section({ //добавляем карточки из массива на страницу
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, {
      handleCardClick: () => {
        card._handleOpenPopup();
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
  cardListSection
);

const form = new PopupWithForm(formElementFoto, { //добавляем новые фотографии на страницу
  formSelector: '.popup-foto',
  handleFormSubmit: (item) => {
    const card = new Card(item.title, item.link, { handleCardClick: () => { card._handleOpenPopup(); } });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    form.close();
  }
});

const formProfile = new PopupWithForm(formProfileElement, { //добавляем данные в профиль пользователя
  formSelector: '.popup__profile',
  handleFormSubmit: (item) => {
    const newUser = new UserInfo(item.name, item.work);
    newUser.setUserInfo();
    formProfile.close();
  }
});

formProfile.generateForm(); //запускаем добавление новых данных в профиль пользователя
form.generateForm(); //запускаем добавление новых карточек на страницу
cardsList.renderItems(); // запускаем рисовку карточек из массива
document.addEventListener('click', overlay); // слушатель события нажатия на оверлэй
openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
startingValidation(); // запускаем валидацию 



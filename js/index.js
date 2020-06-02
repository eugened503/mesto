import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {obj} from './FormValidator.js';
import {popupEnlargement} from './Card.js';
import {initialCards} from './initialCards.js';
import {closePopups} from './utils.js'
import {clearError} from './utils.js'
import {openPopups} from './utils.js'

const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы (профиль пользователя)
const closeBtn = document.querySelector('.popup__close-button'); // присвоение переменной элемента - кнопки закрытия формы (профиль пользователя)
const formProfileElement = document.querySelector('.popup'); //присвоение переменной элемента - формы (профиль пользователя)
const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя" (профиль пользователя)
const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
const saveBtn = document.querySelector('.popup__btn'); // присвоение переменной элемента - кнопки сохранения формы (профиль пользователя)
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"
const closeBtnEnlargement = document.querySelector('.popup__close-button-enlargement'); //кнопка закрытия поп-апа (увеличенный вид)
const formElementFoto = document.querySelector('.popup-foto'); // поп-ап для добавления карточки
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова поп-апа (добавление карточки)
const saveBtnFoto = document.querySelector('.popup__btn-foto'); // кнопка отправки  поп-апа (добавление карточки)
const closeBtnFoto = document.querySelector('.popup__close-button-foto'); //кнопка закрытия  поп-апа (добавление карточки)
const nameInputFoto = document.querySelector('.popup__name'); // название фотографии в поп-апе (добавление карточки)
const linkInputFoto = document.querySelector('.popup__link'); // ссылка на фотографию в поп-апе (добавление карточки)
const forms = Array.from(document.querySelectorAll('.popup__form')); //массив из форм (для валидации)

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
    clearError(formProfileElement); 
    evt.preventDefault();
    openPopups(formProfileElement); // открытие модального окна
    nameInput.value = infoTitle.textContent;  // заполнение полей формы
    jobInput.value = infoSubtitle.textContent;
}

function submitForm(evt) { // функция отправки формы редактирования профиля пользователя
    evt.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closePopups(formProfileElement);
}

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
    clearError(formElementFoto);
    openPopups(formElementFoto); //открываем поп-ап
    nameInputFoto.value = '';
    linkInputFoto.value = '';
}

function formSubmitHandlerFoto(evt) { // функция отправки данных формы (добавление карточки) 
    evt.preventDefault();
    const card = new Card(nameInputFoto.value, linkInputFoto.value); // создадим экземпляр карточки 
    document.querySelector('.cards').prepend(card.generateCard());
    closePopups(formElementFoto); //закрываем поп-ап
}

function startingValidation () {   //функция находит формы и запускает валидацию для каждой формы.
    forms.forEach((form) => { 
    const sharedValidator = new FormValidator(obj, form);
    sharedValidator.enableValidation();                  
    });
  }

initialCards.forEach((item) => { // переберём весь исходный массив
    const card = new Card(item.name, item.link); // создадим экземпляр карточки для каждого элемента
    document.querySelector('.cards').prepend(card.generateCard());
      });
    
openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
closeBtn.addEventListener('click', () => closePopups(formProfileElement)); // слушатель события кнопки открытия формы редактирования профиля
saveBtn.addEventListener('click', submitForm); //слушатель события кнопки отправки формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
closeBtnFoto.addEventListener('click', () => closePopups(formElementFoto)); //слушатель события  кнопки закрытия формы (добавление карточки)
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы (добавление карточки)
closeBtnEnlargement.addEventListener('click', () => closePopups(popupEnlargement)); //слушатель события  кнопки закрытия поп-апа (увеличенный вид)
startingValidation(); 



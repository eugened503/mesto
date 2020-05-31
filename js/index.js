import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы (профиль пользователя)
const closeBtn = document.querySelector('.popup__close-button'); // присвоение переменной элемента - кнопки закрытия формы (профиль пользователя)
const formProfileElement = document.querySelector('.popup'); //присвоение переменной элемента - формы (профиль пользователя)
const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя" (профиль пользователя)
const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
const saveBtn = document.querySelector('.popup__btn'); // присвоение переменной элемента - кнопки сохранения формы (профиль пользователя)
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"
export const popupEnlargement = document.querySelector('.popup-enlargement'); //поп-ап просмотра карточки (увеличенный вид)
const closeBtnEnlargement = document.querySelector('.popup__close-button-enlargement'); //кнопка закрытия поп-апа (увеличенный вид)
const formElementFoto = document.querySelector('.popup-foto'); // поп-ап для добавления карточки
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова поп-апа (добавление карточки)
const saveBtnFoto = document.querySelector('.popup__btn-foto'); // кнопка отправки  поп-апа (добавление карточки)
const closeBtnFoto = document.querySelector('.popup__close-button-foto'); //кнопка закрытия  поп-апа (добавление карточки)
const nameInputFoto = document.querySelector('.popup__name'); // название фотографии в поп-апе (добавление карточки)
const linkInputFoto = document.querySelector('.popup__link'); // ссылка на фотографию в поп-апе (добавление карточки)
const allPop = Array.from(document.querySelectorAll('.popup')); //массив поп-апов
const arrayInput = Array.from(document.querySelectorAll('.popup__input')); // массив из инпутов 
const arraySpan = Array.from(document.querySelectorAll('.popup__input-error')); // массив из спанов
const forms = Array.from(document.querySelectorAll('.popup__form')); //массив из форм (для валидации)
const obj = { // объект настроек валидации
    inactiveButtonClass: 'popup__btn_disabled', //отключенная кнопка
    inputErrorClass: 'popup__input_type_error', // некорректные данные инпута (Нижняя рамка)
    errorClass: 'popup__error_visible' // информация об ошибке
  }
  
function clearError (elem) { // функция удаляет поля с ошибками и делает активным/пассивным состояние кнопки при открытии поп-апа
    arraySpan.forEach((span) => {
            span.classList.remove(obj.errorClass);         
            span.textContent = '';
        })
    arrayInput.forEach((input) => {
            input.classList.remove(obj.inputErrorClass);    
        });

const formButton = elem.querySelector('.popup__btn'); //находим кнопку поп-апа
if ( elem === formElementFoto) {
    formButton.disabled = true;
    formButton.classList.add(obj.inactiveButtonClass); 
} else {
    formButton.disabled = false;
    formButton.classList.remove(obj.inactiveButtonClass);
}

};

function filterAllPopups (){ //функция поиска отрытого поп-апа с целью его закрытия
    allPop.forEach((popup) => {                         
        if(popup.classList.contains('popup_opened')) {  
            closeAllPopups(popup);                
        }
    });
}
function escape(e) { //функция закрытия поп-апов клавишей esc
    if(e.key === 'Escape') {
        filterAllPopups ();
    }
}

function overlay(e) { // оверлэй-функция
    if(e.target.classList.contains('popup')){
        filterAllPopups ();
}
}

export default function openAllPopups(modalWindow) { //функция открытия всех поп-апов
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', escape); //добавляем слушатель для клавиши esc
    modalWindow.addEventListener('click', overlay); // добавляем слушатель (оверлэй для профиля)
}

function closeAllPopups(modalWindow) { //функция закрытия всех поп-апов
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', escape); //удаляем слушатель для клавиши esc
    modalWindow.removeEventListener('click', overlay); //удаляем слушатель (оверлэй для профиля)
}

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
    clearError(formProfileElement); 
    evt.preventDefault();
    openAllPopups(formProfileElement); // открытие модального окна
    nameInput.value = infoTitle.textContent;  // заполнение полей формы
    jobInput.value = infoSubtitle.textContent;
}

function submitForm(evt) { // функция отправки формы редактирования профиля пользователя
    evt.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closeAllPopups(formProfileElement);
}

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
    clearError(formElementFoto);
    openAllPopups(formElementFoto); //открываем поп-ап
    nameInputFoto.value = '';
    linkInputFoto.value = '';
}

function formSubmitHandlerFoto(evt) { // функция отправки данных формы (добавление карточки) 
    evt.preventDefault();
    const card = new Card(nameInputFoto.value, linkInputFoto.value); // создадим экземпляр карточки 
    document.querySelector('.cards').prepend(card.generateCard());
    closeAllPopups(formElementFoto); //закрываем поп-ап
}

function startingValidation () {   //функция находит формы и запускает валидацию для каждой формы.
    forms.forEach((form) => { 
    const valid = new FormValidator(obj, form);
    valid.enableValidation();                  
    });
  }
     startingValidation(); 

openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
closeBtn.addEventListener('click', () => closeAllPopups(formProfileElement)); // слушатель события кнопки открытия формы редактирования профиля
saveBtn.addEventListener('click', submitForm); //слушатель события кнопки отправки формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
closeBtnFoto.addEventListener('click', () => closeAllPopups(formElementFoto)); //слушатель события  кнопки закрытия формы (добавление карточки)
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы (добавление карточки)
closeBtnEnlargement.addEventListener('click', () => closeAllPopups(popupEnlargement)); //слушатель события  кнопки закрытия поп-апа (увеличенный вид)




const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы
const closeBtn = document.querySelector('.popup__close-button'); // присвоение переменной элемента - кнопки закрытия формы 
const formElement = document.querySelector('.popup'); //присвоение переменной элемента - формы
const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя"
const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
const saveBtn = document.querySelector('.popup__btn'); // присвоение переменной элемента - кнопки сохранения формы 
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"

function openPopup() { //функция открытия формы
    formElement.classList.add('popup_opened');
    nameInput.value = infoTitle.textContent;
    jobInput.value = infoSubtitle.textContent;
};

function closePopup() { // функция закрытия формы
    formElement.classList.remove('popup_opened')
};

function formSubmitHandler(evt) { // функция отправки формы
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closePopup();
}
closeBtn.addEventListener('click', closePopup); // слушатель события кнопки закрытия формы
openBtn.addEventListener('click', openPopup); // слушатель события кнопки открытия формы
saveBtn.addEventListener('click', formSubmitHandler); //слушатель события кнопки отправки формы

const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы (профиль пользователя)
const closeBtn = document.querySelector('.popup__close-button'); // присвоение переменной элемента - кнопки закрытия формы (профиль пользователя)
const formProfileElement = document.querySelector('.popup'); //присвоение переменной элемента - формы (профиль пользователя)
const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя" (профиль пользователя)
const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
const saveBtn = document.querySelector('.popup__btn'); // присвоение переменной элемента - кнопки сохранения формы (профиль пользователя)
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"
const popupEnlargement = document.querySelector('.popup-enlargement'); //поп-ап просмотра карточки (увеличенный вид)
const closeBtnEnlargement = document.querySelector('.popup__close-button-enlargement'); //кнопка закрытия поп-апа (увеличенный вид)
const modalImg = document.querySelector('.popup__img-enlargement'); // фотография в поп-апе (увеличенный вид)
const captionText = document.querySelector('.popup__title-enlargement'); //текст в поп-апе (увеличенный вид)
const cardsContainer = document.querySelector('.cards'); // контейнер для карточек
const cardTemplate = document.querySelector('#card').content; 
const formElementFoto = document.querySelector('.popup-foto'); // поп-ап для добавления карточки
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова поп-апа (добавление карточки)
const saveBtnFoto = document.querySelector('.popup__btn-foto'); // кнопка отправки  поп-апа (добавление карточки)
const closeBtnFoto = document.querySelector('.popup__close-button-foto'); //кнопка закрытия  поп-апа (добавление карточки)
const nameInputFoto = document.querySelector('.popup__name'); // название фотографии в поп-апе (добавление карточки)
const linkInputFoto = document.querySelector('.popup__link'); // ссылка на фотографию в поп-апе (добавление карточки)
const allPop = Array.from(document.querySelectorAll('.popup')); //массив поп-апов
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

//функция очищает поля с ошибками и "вызывает" состояние кнопки
function clearError (elem) {
  const objectBtn = {inactiveButtonClass: 'popup__btn_disabled'}; //объект неактивной кнопки
  const objectInput = {inputErrorClass: 'popup__input_type_error'}; //объект инпута
  const buttonElement = elem.querySelector('.popup__btn'); //кнопка формы
  const bugInput = Array.from(elem.querySelectorAll('.popup__input')); //массив инпутов 

  elem.firstElementChild.reset(); // сброс значений инпутов
 
  toggleButtonState(objectBtn, bugInput, buttonElement); //делаем кнопку активной/пассивной
        bugInput.forEach((inputElement) => {
         hideInputError(objectInput, elem, inputElement); //удаляем текст ошибок и нижнее подчеркивание
     });
  }

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

function openAllPopups(modalWindow) { //функция открытия всех поп-апов
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

function openPopupEnlargement(evt) { //функция просмотра фотографии в режиме "зум"
    modalImg.src = evt.target.src; 
    modalImg.alt = evt.target.dataset.name;
    captionText.textContent  = evt.target.dataset.name;
    openAllPopups(popupEnlargement);
}

function toggleLike(evt) { //измененеи цвета лайка по клику
    evt.target.classList.toggle('card__like-button_active');
  }; 

function deleteCard(cardElement, cardElementLike, cardElementImage) { //функция удаления карточки и слушателей
    cardElementImage.removeEventListener('click', openPopupEnlargement);
    cardElementLike.removeEventListener('click', toggleLike);
    cardElement.remove(); 
}

function createСard(name, link) { //функция добавления карточки
    const cardElement = cardTemplate.firstElementChild.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.card__title'); //название фотографии в карточке
    const cardElementImage = cardElement.querySelector('.card__image'); //фотография в карточке
    const cardElementLike =  cardElement.querySelector('.card__like-button'); // кнопка "лайк"
    const cardElementTrash =  cardElement.querySelector('.card__trash-button'); // кнопка "delete"
    
    cardElementTitle.textContent = name;
    cardElementImage.src = link;
    cardElementImage.dataset.name = name;

    cardElementImage.addEventListener('click', openPopupEnlargement); //вызов функции просмотра фотографии в увеличенном виде
    cardElementLike.addEventListener('click', toggleLike); //добавляем или убираем лайк
    cardElementTrash.addEventListener('click', () => deleteCard(cardElement, cardElementLike, cardElementImage), {once: true}); //удаляем карточку и слушатели

    return cardElement;
}

  function cycleAddingCard () { // добавляем карточки из массива
    initialCards.forEach(({name, link}) => cardsContainer.prepend(createСard(name, link)));
}  

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
    clearError(formElementFoto);
    openAllPopups(formElementFoto); //открываем поп-ап
    nameInputFoto.value = '';
    linkInputFoto.value = '';
}

function formSubmitHandlerFoto(evt) { // функция отправки данных формы (добавление карточки) 
    evt.preventDefault();
    cardsContainer.prepend(createСard(nameInputFoto.value, linkInputFoto.value)); //передаем данные в карточку
    closeAllPopups(formElementFoto); //закрываем поп-ап
}

openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
closeBtn.addEventListener('click', () => closeAllPopups(formProfileElement)); // слушатель события кнопки открытия формы редактирования профиля
saveBtn.addEventListener('click', submitForm); //слушатель события кнопки отправки формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
closeBtnFoto.addEventListener('click', () => closeAllPopups(formElementFoto)); //слушатель события  кнопки закрытия формы (добавление карточки)
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы (добавление карточки)
closeBtnEnlargement.addEventListener('click', () => closeAllPopups(popupEnlargement)); //слушатель события  кнопки закрытия поп-апа (увеличенный вид)
cycleAddingCard ();
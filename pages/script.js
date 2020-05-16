
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
const closeOverlayPro = document.querySelector('.popup__overlay'); // элемент оверлэй-закрытия формы "профиль пользователя"
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

// функция очищения полей с ошибками
function clearError (field) {
    const bugInput = Array.from(field.querySelectorAll('.popup__input')); //массив инпутов
    const bugSpan = Array.from(field.querySelectorAll('span')); //массив спанов
    const bugBtn = field.querySelector('.popup__btn'); //кнопка формы 
    
    bugSpan.forEach((span) => {
        span.classList.remove('popup__error_visible'); // очищаем спан
        span.textContent = '';
    })
    
    bugInput.forEach((input) => {
        input.classList.remove('popup__input_type_error'); // очищаем инпут от ошибок
        if (input.validity.valid) { //проверяем инпут на валидность:
            bugBtn.classList.remove('popup__btn_disabled'); //делаем кнопку неактивной
          } else { 
            bugBtn.classList.add('popup__btn_disabled'); // или делаем кнопку активной
          }
    });
  }

  function openAllpopap(modalWindow) { //функция открытия всех поп-апов
    modalWindow.classList.add('popup_opened');
    clearError(modalWindow);
    document.addEventListener('keydown', function(event) { //закрытие клавишей esc
        const key = event.key; 
        if (key === "Escape") {
            modalWindow.classList.remove('popup_opened');    
        }
    });
}

function closeAllpopap(modalWindow) { //функция закрытия всех поп-апов
    modalWindow.classList.remove('popup_opened');
}

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
    evt.preventDefault();
    // Заполнение полей формы
    nameInput.value = infoTitle.textContent;
    jobInput.value = infoSubtitle.textContent;
    // Открытие модального окна
    openAllpopap(formProfileElement);
    
}

function submitForm(evt) { // функция отправки формы редактирования профиля пользователя
    evt.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closeAllpopap(formProfileElement);
}

function openPopupEnlargement(title, picture) { //функция открытия поп-апа с фотографией в увеличенном виде
   captionText.textContent =  title; //передаем название карточки в поп-ап (увеличенный вид)
   modalImg.src = picture; //передаем фото карточки в поп-ап (увеличенный вид)
   openAllpopap(popupEnlargement);
  
}

function createСard(name, link) { //функция добавления карточки
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.card__title'); //название фотографии в карточке
    const cardElementImage =  cardElement.querySelector('.card__image'); //фотография в карточке
    cardElementTitle.textContent = name;
    cardElementImage.src = link;

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
      }); //измененеи цвета лайка по клику
    
    cardElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
      }); //удаление карточки по клику

    cardElementImage.addEventListener('click', () => { //вызов по клику функции просмотра фотографии в увеличенном виде 
        openPopupEnlargement(name, link)}
    ); 
    
    return cardElement;
}

for (let i = 0; i < initialCards.length; i++) { //добавление карточек из массива с помощью цикла
    const card = createСard(initialCards[i].name, initialCards[i].link);
    cardsContainer.prepend(card);
  }

function openPopupFoto() { //функция открытия поп-апа по добавлению названия фотографии и ссылки
    nameInputFoto.value = '';
    linkInputFoto.value = '';
    openAllpopap(formElementFoto);
  
}

function formSubmitHandlerFoto(evt) { // функция отправки данных формы (добавление карточки)
    evt.preventDefault();
    cardsContainer.prepend(createСard(nameInputFoto.value, linkInputFoto.value)); //передаем данные в карточку
    closeAllpopap(formElementFoto);
}

function overlay(evt) { // функция "оверлэй"
    evt.target.classList.remove('popup_opened');
  }

openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
closeBtn.addEventListener('click', () => closeAllpopap(formProfileElement)); // слушатель события кнопки открытия формы редактирования профиля
saveBtn.addEventListener('click', submitForm); //слушатель события кнопки отправки формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
closeBtnFoto.addEventListener('click', () => closeAllpopap(formElementFoto)); //слушатель события  кнопки закрытия формы (добавление карточки)
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы (добавление карточки)
closeBtnEnlargement.addEventListener('click', () => closeAllpopap(popupEnlargement)); //слушатель события  кнопки закрытия поп-апа (увеличенный вид)
closeOverlayPro.addEventListener('click', overlay, false); // оверлэй для профиля
formElementFoto.addEventListener('click', overlay, false); //оверлэй для карточки
popupEnlargement.addEventListener('click', overlay, false); // оверлэй фотографии

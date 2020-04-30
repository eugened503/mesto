/*Всплывающее окно для редактирования профиля пользователя*/ 
const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы
const closeBtn = document.querySelector('.popup__close-button'); // присвоение переменной элемента - кнопки закрытия формы 
const formElement = document.querySelector('.popup'); //присвоение переменной элемента - формы
const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя"
const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
const saveBtn = document.querySelector('.popup__btn'); // присвоение переменной элемента - кнопки сохранения формы 
const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"

function togglePopup(modalWindow) { // общая функция открытия и закрытия формы
    modalWindow.classList.toggle('popup_opened');
}

function callForm() { //функция вызова формы
    togglePopup(formElement);
    completeForm();
}

function completeForm() { // функция заполнения формы
if (formElement.classList.contains('popup_opened')) {
    nameInput.value = infoTitle.textContent;
    jobInput.value = infoSubtitle.textContent;
 } else {
    infoTitle.value = nameInput.textContent;
    infoSubtitle.value = jobInput.textContent;
}
}

function submitForm(evt) { // функция отправки формы
    evt.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    callForm();
}

closeBtn.addEventListener('click',callForm); // слушатель события кнопки закрытия формы
openBtn.addEventListener('click', callForm); // слушатель события кнопки открытия формы
saveBtn.addEventListener('click', submitForm); //слушатель события кнопки отправки формы

const initialCards = [
    {
        name: 'Магадан',
        link: 'https://images.unsplash.com/photo-1570340831042-040b3999690c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80'
    },
    {
        name: 'Абакан',
        link: 'https://images.unsplash.com/photo-1584314484329-dedfde6f6392?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1482&q=80'
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

function openPopupEnlargement(evt) { //функция открытия попапа с фотографией в увеличенном виде
    const item = evt.target;
    togglePopup(popupEnlargement);
    captionText.textContent = item.name; //передаем название карточки в попап
    modalImg.src =  item.src; //передаем фото карточки в попап
};

const cardsContainer = document.querySelector('.cards'); 
const cardTemplate = document.querySelector('#card').content;

function createСard(name, link) { //функция добавления карточки
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.card__title');
    const cardElementImage =  cardElement.querySelector('.card__image');

    cardElementTitle.textContent = name;
    cardElementImage.src = link;

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
      }); //измененеи цвета лайка по клику
    
    cardElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
      }); //удаление карточки по клику

    cardElementImage.addEventListener('click',  openPopupEnlargement); //вызов функции просмотра фотографии в увеличенном виде
       
    return cardElement;
}

for (let i = 0; i < initialCards.length; i++) { //добавление карточек из массива с помощью цикла
    const card = createСard(initialCards[i].name, initialCards[i].link);
    cardsContainer.prepend(card);
  }

/*Всплывающее окно для добавления ссылки и названия фотографии*/ 
const formElementFoto = document.querySelector('.popup-foto'); // форма (попап) добавления карточки
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова формы 
const saveBtnFoto = document.querySelector('.popup__btn-foto'); // кнопка отправки формы
const closeBtnFoto = document.querySelector('.popup__close-button-foto'); //кнопка закрытия формы

const nameInputFoto = document.querySelector('.popup__name'); // название фотографии в попапе
const linkInputFoto = document.querySelector('.popup__link'); // ссылка на фотографию в попапе

function openPopupFoto() { //функция открытия попапа по добавлению названия фотографии и ссылки
    togglePopup(formElementFoto);
    nameInputFoto.value = '';
    linkInputFoto.value = '';
};

function closePopupFoto() { //функция закрытия попапа
    togglePopup(formElementFoto);
};

function formSubmitHandlerFoto(evt) { // функция отправки данных формы
    evt.preventDefault();
    cardsContainer.prepend(createСard(nameInputFoto.value, linkInputFoto.value)); //передаем данные в карточку
    closePopupFoto();
}

openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы
closeBtnFoto.addEventListener('click', closePopupFoto); //слушатель события  кнопки закрытия формы
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы

/*Всплывающее окно для просмотра фотографий в увеличенном виде*/ 
const popupEnlargement = document.querySelector('.popup-enlargement'); //форма (попап) просмотра карточки в увеличенном виде
const closeBtnEnlargement = document.querySelector('.popup__close-button-enlargement'); //кнопка закрытия формы
const modalImg = document.querySelector('.popup__img-enlargement'); // фото в попапе
const captionText = document.querySelector('.popup__title-enlargement'); //текст в попапе

function closePopupEnlargement() { //функция закрытия попапа
    togglePopup(popupEnlargement);
};

closeBtnEnlargement.addEventListener('click', closePopupEnlargement); //слушатель события  кнопки закрытия формы
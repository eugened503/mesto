
/*Всплывающее окно для редактирования профиля пользователя*/ 

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

    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closePopup();
}
closeBtn.addEventListener('click', closePopup); // слушатель события кнопки закрытия формы
openBtn.addEventListener('click', openPopup); // слушатель события кнопки открытия формы
saveBtn.addEventListener('click', formSubmitHandler); //слушатель события кнопки отправки формы

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

function addСards(a, b) { //функция добавления карточки

    const cardTemplate = document.querySelector('#card').content;
    const cardsOnline = document.querySelector('.cards');
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = a;
    cardElement.querySelector('.card__image').src = b;

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
      }); //измененеи цвета лайка по клику
    

      cardElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
      }); //удаление карточки по клику

      cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
       
        openPopupEnlargement(a, b); //по клику передаем изображение и название карточки в попап для просмотра фотографий в увеличенном режиме
      }); 

    cardsOnline.prepend(cardElement);

}

for (let i = 0; i < initialCards.length; i++) { // добавляем карточки из массива
    addСards(initialCards[i].name, initialCards[i].link);
}

/*Всплывающее окно для добавления ссылки и названия фотографии*/ 

const formElementFoto = document.querySelector('.popupFoto'); // форма (попап) добавления карточки
const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова формы 
const saveBtnFoto = document.querySelector('.popup__btnFoto'); // кнопка отправки формы
const closeBtnFoto = document.querySelector('.popup__close-buttonFoto'); //кнопка закрытия формы

const nameInputFoto = document.querySelector('.popup__name'); // название фотографии в попапе
const linkInputFoto = document.querySelector('.popup__link'); // ссылка на фотографию в попапе

const cardTitle = document.querySelector('.card__title'); // название фотографии в карточке
const cardImage = document.querySelector('.card__image'); // фотография в карточке

function openPopupFoto() { //функция открытия попапа по добавлению названия фотографии и ссылки
    formElementFoto.classList.add('popup_opened');
    nameInputFoto.value = '';
    linkInputFoto.value = '';
};

function closePopupFoto() { //функция закрытия попапа
    formElementFoto.classList.remove('popup_opened')
};


function formSubmitHandlerFoto(evt) { // функция отправки данных формы
    evt.preventDefault();
    addСards(nameInputFoto.value, linkInputFoto.value); //передаем данные в карточку
    DelLastCards();
    closePopupFoto();
}

function DelLastCards() { //функция удаления последней карточки
    let description = document.querySelector('.cards');
    description.removeChild(description.lastElementChild);
}

openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы
closeBtnFoto.addEventListener('click', closePopupFoto); //слушатель события  кнопки закрытия формы
saveBtnFoto.addEventListener('click', formSubmitHandlerFoto); //слушатель события  кнопки отправки формы


/*Всплывающее окно для просмотра фотографий в увеличенном режиме*/ 

const popupEnlargement = document.querySelector('.popupEnlargement'); //форма (попап) просмотра карточки в увеличенном режиме
const closeBtnEnlargement = document.querySelector('.popup__close-buttonEnlargement'); //кнопка закрытия формы
const modalImg = document.querySelector('.popup__imgEnlargement'); // фото в попапе
const captionText = document.querySelector('.popup__titleEnlargement'); //текст в попапе

function openPopupEnlargement(x, y) { 
    popupEnlargement.classList.add('popup_opened');
    captionText.textContent = x; //передаем название карточки в попап
    modalImg.src = y; //передаем фото карточки в попап
};

function closePopupEnlargement() { //функция закрытия попапа
    popupEnlargement.classList.remove('popup_opened');
};

closeBtnEnlargement.addEventListener('click', closePopupEnlargement); //слушатель события  кнопки закрытия формы
export const popupEnlargement = document.querySelector('.popup-enlargement'); //поп-ап просмотра карточки (увеличенный вид)
export const imgEnlargement = document.querySelector('.popup__img-enlargement'); // поле поп-апа для ссылки
export const titleEnlargement = document.querySelector('.popup__title-enlargement'); // поле поп-апа для названия фотографии
export const btns = Array.from(document.querySelectorAll('.popup__close-button')); // массив кнопок закрытия
export const cardListSection = '.cards'; // контейнер для карточек
export const openBtn = document.querySelector('.profile-info__button'); //присвоение переменной элемента - кнопки редактирования формы (профиль пользователя)
export const formProfileElement = document.querySelector('.popup__profile'); //присвоение переменной элемента - формы (профиль пользователя)
export const infoTitle = document.querySelector('.profile-info__title'); //присвоение переменной элемента - "имя пользователя" (профиль пользователя)
export const infoSubtitle = document.querySelector('.profile-info__subtitle'); //присвоение переменной элемента - "род деятельности пользователя"
export const nameInput = document.querySelector('.popup__text_text-margin'); //присвоение переменной элемента - "поле ввода имени пользователя"
export const jobInput = document.querySelector('.popup__text_work-margin'); //присвоение переменной элемента - "поле ввода рода деятельности пользователя"
export const formElementFoto = document.querySelector('.popup-foto'); // поп-ап для добавления карточки
export const openBtnAdd = document.querySelector('.profile__add-button'); // кнопка вызова поп-апа (добавление карточки)
export const forms = Array.from(document.querySelectorAll('.popup__form')); //массив из форм (для валидации
export const obj = { // объект настроек валидации
    inactiveButtonClass: 'popup__btn_disabled', //отключенная кнопка
    inputErrorClass: 'popup__input_type_error', // некорректные данные инпута (Нижняя рамка)
    errorClass: 'popup__error_visible' // информация об ошибке
  }
  export const initialCards = [
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


import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import API from '../components/api.js';
import Popup from '../components/Popup.js';
import { baseUrl } from '../components/baseUrl.js';
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
const popupDeletingCard = document.querySelector('.popup-deleting-card'); //поп-ап для подтверждения удаления карточки
const avatarBtn = document.querySelector('.header__pencil'); // изображение "карандаш" 
const popupAvatar = document.querySelector('.popup-avatar'); // поп-ап добавляющий аватар
const containerAvatar = document.querySelector('.popup__avatar-container'); //контейнер поп-апа для добавления аватара
const saveBtnProfile = document.querySelector('.popup__btn'); //кнопка сохранения в поп-апе редактирования профиля
const saveBtnFoto = document.querySelector('.popup__btn-foto'); //кнопка сохранения в поп-апе редактирования карточки
const saveBtnAvatar = document.querySelector('.popup__btn-avatar'); //кнопка сохранения в поп-апе добавления аватара
const apiCards = new API({ baseUrl }); // экземпляр api c базовым url

import './index.css'; 

const initialValidatorProfile = new FormValidator(obj, containerProfile); //экземпляр для очистки полей профиля от ошибок

function openProfileForm(evt) { //открываем форму редактирования профиля пользователя
  evt.preventDefault();
  initialValidatorProfile.clearError(formProfileElement); //очищаем поля от ошибок
  const autor = formUser.getUserInfo();
  nameInput.value = autor.name;
  jobInput.value = autor.about;
  formSubmitHandler.open();
  renderLoading(false, saveBtnProfile); 
}

const formUser = new UserInfo({ //экземпляр для создания новой карточки пользователя
  title: '.profile-info__title',
  subtitle: '.profile-info__subtitle'
}, apiCards);

const formSubmitHandler = new PopupWithForm(formProfileElement, { // добавляем данные пользователя на страницу
  handleFormSubmit: (item) => {
    renderLoading(true, saveBtnProfile); //уведомление пользователя о процессе загрузки
    formUser.setUserInfo(item);
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

const popupImage = new PopupWithImage(popupEnlargement, imgEnlargement, titleEnlargement);
const popupClose = new Popup(popupDeletingCard);

//функция создает и возвращает карточку для каждого элемента
function takesCards(item) {
  const cardInit = new Card(item, item.name, item.link, {
    handleCardClick: () => {
      popupImage.open(item.name, item.link); //открываем фотографию по клику
    },
    handleDeleteCard: (element) => { //удаление фотографии 
      const popupClose = new PopupWithForm(popupDeletingCard, {
        handleFormSubmit: ({ }) => {
          apiCards.deleteCard(`/cards/${item._id}`)
            .then(() => {
              element.remove(); //удаление элемента 
              element = null;
              cardInit.removeEventListeners(); //удаление всех слушателей
            })
            .catch((err) => {
              console.log(`ошибка: ${err}`)
            });
        }
      });
      popupClose.open(); //открытие поп-апа для подтверждения удаления
    }
  }, apiCards
  );
  const cardElement = cardInit.generateCard();
  return cardElement;
}

//функция загрузки карточек с сервера
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(takesCards(item)); //передаем функцию по созданию карточки
  }
}, cardListSection);
apiCards.getInitialCards('/cards').then((arr) => { //получение карточек с сервера и их отрисовка
  cardList.drawingArray(arr);
})

// функция добавления новых карточек
const form = new PopupWithForm(formElementFoto, {
  handleFormSubmit: (formData) => {//создаю массив из объекта инпутов
    renderLoading(true, saveBtnFoto);
    apiCards.sendCard('/cards', formData)
      .then((data) => {
        cardList.drawingArray([data]); //создает карточку
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`)
      })
      .finally(() => {
        renderLoading(false, saveBtnFoto);
      });
  }
});

const initialValidatorAvatar = new FormValidator(obj, containerAvatar);
initialValidatorAvatar.clearError(popupAvatar);

function openProfileAvatar(evt) {
  evt.preventDefault();
  initialValidatorAvatar.clearError(popupAvatar);
  formAvatar.open();

}

const formAvatar = new PopupWithForm(popupAvatar, { //обновляем информацию об аватаре на сервере
  handleFormSubmit: (formData) => {
    renderLoading(true, saveBtnAvatar); //уведомление пользователя о процессе загрузки
    apiCards.changeAvatar('/users/me/avatar', formData)
      .then((data) => {
        document.querySelector('.profile__image').src = data.avatar;
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, saveBtnAvatar);
      });
  }
});

apiCards.getUserInfoServer('/users/me') //Получаем аватар с сервера
  .then((data) => {
    document.querySelector('.profile__image').src = data.avatar;
  })
  .catch((err) => {
    console.log(`ошибка: ${err}`);
  })

const UserServer = new UserInfo({ //экземпляр новой карточки с информацией о пользователе с сервера
  title: '.profile-info__title',
  subtitle: '.profile-info__subtitle'
}, apiCards)

apiCards.getUserInfoServer('/users/me').then(data => UserServer.setUserInfo(data));

function renderLoading(isLoading, btn) { // функция по уведомлению пользователя о процессе загрузки
  if (isLoading) {
    btn.textContent = 'Сохранение...';
  } else {
    if (btn.classList.contains('popup__btn-foto')) {
      btn.textContent = 'Cоздать';
    } else {
      btn.textContent = 'Сохранить';
    }
  }
}

avatarBtn.addEventListener('click', openProfileAvatar); //слушатель события  кнопки открытия формы (аватар пользователя)
openBtn.addEventListener('click', openProfileForm); // слушатель события кнопки закрытия формы редактирования профиля
openBtnAdd.addEventListener('click', openPopupFoto); //слушатель события  кнопки открытия формы (добавление карточки)
startingValidation(); // запускаем валидацию 


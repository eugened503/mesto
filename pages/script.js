const openBtn = document.querySelector('.profile-info__button'); /*присвоение переменной элемента - кнопки редактирования формы*/
const closeBtn = document.querySelector('.popup__close-button'); /*присвоение переменной элемента - кнопки закрытия формы*/
const saveBtn = document.querySelector('.popup__btn'); /*присвоение переменной элемента - кнопки сохранения изменений формы*/
const formElement = document.querySelector('.popup'); /*присвоение переменной элемента - формы*/
const infoTitle = document.querySelector('.profile-info__title'); /*присвоение переменной элемента - "имя пользователя"*/
const infoSubtitle = document.querySelector('.profile-info__subtitle'); /*присвоение переменной элемента - "род деятельности пользователя"*/

openBtn.addEventListener('click', double); /*вызов функции открытия и закрытия формы*/
closeBtn.addEventListener('click', double);

function double() { /*функция открытия и закрытия формы*/
    if (formElement.classList.contains('popup_opened')) {
        document.querySelector('.popup').classList.remove('popup_opened'); /*закрытие формы*/

        function clean() { /*функция сброса несохраненных данных формы*/
            document.querySelector('.popup__text_text-margin').value = "Жак-Ив Кусто";
            document.querySelector('.popup__text_work-margin').value = "Исследователь океана";
        }
        clean();
    } else {
        document.querySelector('.popup').classList.add('popup_opened'); /*открытие формы*/
    }
}
saveBtn.addEventListener("click", function() { /*функция сохранения данных формы*/
    document.querySelector('.popup').classList.remove('popup_opened');

});

function formSubmitHandler(evt) { /*функция отправки данных формы*/
    evt.preventDefault();

    const nameInput = document.querySelector('.popup__text_text-margin').value; /*значение полей из свойства value*/
    const jobInput = document.querySelector('.popup__text_work-margin').value;

    infoTitle.textContent = nameInput; /*вставляем новые значения с помощью textContent*/
    infoSubtitle.textContent = jobInput;
}

formElement.addEventListener('submit', formSubmitHandler);
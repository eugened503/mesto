
 const hideInputError = (formObject, formElement, inputElement) => { 
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

const showInputError = (formObject, formElement, inputElement, errorMessage) => { 
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.classList.add(formObject.errorClass);
  errorElement.textContent = errorMessage;
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (formObject, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
    
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const checkInputValidity = (formObject, formElement, inputElement) => { 
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает в параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formObject, formElement, inputElement);
  }
};

const setEventListeners = (formObject, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
   // чтобы проверить состояние кнопки в самом начале
   toggleButtonState(formObject, inputList, buttonElement);
  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formObject, formElement, inputElement)
      toggleButtonState(formObject, inputList, buttonElement);
    });
  });
};

const enableValidation = (formObject) => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    setEventListeners(formObject, formElement);
  });
};

enableValidation({
    formSelector: '.popup__form', //контейнер поп-апа
    inputSelector: '.popup__input', //инпуты
    submitButtonSelector: '.popup__btn', //активная кнопка
    inactiveButtonClass: 'popup__btn_disabled', //отключенная кнопка
    inputErrorClass: 'popup__input_type_error', // некорректные данные инпута (Нижняя рамка)
    errorClass: 'popup__error_visible' // информация об ошибке
  });

  
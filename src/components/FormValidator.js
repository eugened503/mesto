export default class FormValidator {
  constructor(obj, form) {
    this._obj = obj;
    this._form = form;
  }

  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._obj.errorClass);
  };

  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._obj.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._obj.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    const buttonElement = this._form.querySelector('.popup__btn');
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

 clearError(elem) { // функция удаляет ошибки перед открытием поп-апа и генерирует состояние кнопок
    const bugInput = Array.from(elem.querySelectorAll('.popup__input'));
    const buttonElement = elem.querySelector('.popup__btn');
    elem.firstElementChild.reset();
    bugInput.forEach((inputElement) => {
      this._hideInputError(inputElement); //удаляем текст ошибок и нижнее подчеркивание
    });
    this._toggleButtonState(bugInput, buttonElement); //делаем кнопку активной/пассивной
  }

  enableValidation = () => {
    // Для каждой формы вызовем функцию setEventListeners
    this._setEventListeners();
  };
}


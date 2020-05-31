
  export class FormValidator {
      constructor(obj, form) {
          this._obj=obj;
          this._form=form;
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
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
              // Если поле не валидно, колбэк вернёт true
          // Обход массива прекратится и вся фунцкция
          // hasInvalidInput вернёт true
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
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const buttonElement = this._form.querySelector('.popup__btn');
       // console.log(buttonElement);
        // чтобы проверить состояние кнопки в самом начале
       this._toggleButtonState(inputList, buttonElement);
        // Обойдём все элементы полученной коллекции
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
  
      enableValidation = () => {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        const formList = Array.from(this._form);
        // Переберём полученную коллекцию
        formList.forEach(() => {
          // Для каждой формы вызовем функцию setEventListeners,
          this._setEventListeners();
        });
      };
    }
  
    
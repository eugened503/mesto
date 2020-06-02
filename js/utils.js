import {obj} from './FormValidator.js';
import FormValidator from './FormValidator.js';

export function closePopups(modalWindow) { //функция закрытия всех поп-апов
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeOverlay); //удаляем слушатель для клавиши esc
    document.removeEventListener('click', escapeOverlay); //удаляем слушатель (оверлэй для профиля)
}

export default function escapeOverlay(e) { 
    const allPop = Array.from(document.querySelectorAll('.popup')); //массив поп-апов
    if(e.key === 'Escape' || e.target.classList.contains('popup')) {
        allPop.forEach((popup) => {                         
            if(popup.classList.contains('popup_opened')) {  
                closePopups(popup);     
            }
        });
    }
}

export function clearError (elem) { 
    const bugInput = Array.from(elem.querySelectorAll('.popup__input'));
    const buttonElement = elem.querySelector('.popup__btn'); 
    const container = elem.querySelector('.popup__container');
    elem.firstElementChild.reset();
    const initialValidator = new FormValidator(obj, container);
    bugInput.forEach((inputElement) => {
        initialValidator._hideInputError(inputElement); //удаляем текст ошибок и нижнее подчеркивание
             });
    initialValidator._toggleButtonState(bugInput, buttonElement); //делаем кнопку активной/пассивной
 }

 export function openPopups(modalWindow) { //функция открытия всех поп-апов
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', escapeOverlay); //добавляем слушатель для клавиши esc
    modalWindow.addEventListener('click', escapeOverlay); // добавляем слушатель (оверлэй для профиля)
}


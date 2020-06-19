import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, pic, title) { //конструктор принимает селектор поп-апа и поля документа
        super(popupSelector);
        this.pic = pic;
        this.title = title;
    }
    open(link, name) { // метод получает название картинки и ссылку на картинку и добавляет их в разметку
        this._setEventListeners();
        this._handleEscClose();
        this.pic.src = link; //добаляем ссылку
        this.pic.alt = name; 
        this.title.textContent = name; //добавляем название 
        this._popupSelector.classList.add('popup_opened');

    }
}
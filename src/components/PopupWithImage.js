import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector, picture, name) { //конструктор принимает селектор поп-апа и поля документа
        super(popupSelector);
        this._picture = picture;
        this._name = name;
    }
    open(name, link) { //добаляем ссылку и имя
        this._picture.src = link; 
        this._picture.alt = name;
        this._name.textContent = name; 
        super.open();
    }
}





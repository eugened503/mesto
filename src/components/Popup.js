import {btns} from '../utils/constants.js';
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }  
    open() {
       this._setEventListeners(); // добавляем слушатель для закрытия поп-апа
       this._handleEscClose(); //метод закрытия попапа клавишей Esc
       this._popupSelector.classList.add('popup_opened');
    
      }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        
    }  
    _handleEscClose(){
        document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {                
                           this.close();    
                            }          
        }); 
}
    _setEventListeners() {
        btns.forEach((btn) => {                         
            btn.addEventListener('click', () => {
                         this.close();
                       });
                    });                
	}
  }

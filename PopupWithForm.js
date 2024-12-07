import Popup from "./Popup.js"

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
    }
    
    _getInputValues() {}

    setEventListeners() {}
}


export default PopupWithForm
import Popup from "./Popup.js"

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
    }
    
    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".popup__input");
        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(evt);
            this._getInputValues();
            this.close();
            this._form.reset();
        });
    }
}


export default PopupWithForm
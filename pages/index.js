import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Section from '../Section.js';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../PopupWithForm.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
   items: initialTodos,
   renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
   }, 
   containerSelector: ".todos__list"
})

section.renderItems();

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

addTodoPopupEl.setEventListeners();

function handleEscapeClose() {
  const openedModal = document.querySelector("popup_visible");
  if (openedModal) {
    openedModal.classList.remove("popup_visible");
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupEl.close();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  addTodoPopupEl.close();
  addTodoForm.reset();
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

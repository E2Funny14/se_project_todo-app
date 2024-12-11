import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Section from '../components/Section.js';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../utils/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, todoCounter);
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

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    addTodoPopupEl.close();
    addTodoForm.reset();
  },
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

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

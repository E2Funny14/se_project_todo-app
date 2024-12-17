import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, todoCounter);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

function renderTodo(item) {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
}

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const id = uuidv4();
    data.id = id;
    renderTodo(data);
    const todo = generateTodo(data);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    addTodoPopupEl.close();
    addTodoForm.reset();
  },
});

addTodoPopupEl.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

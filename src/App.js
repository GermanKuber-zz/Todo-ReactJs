import React, { useState, useContext, useEffect } from "react";
import { TodoForm, TodoList } from "./components/todo";
import logo from "./logo.svg";
import "./App.css";
import {
  addTodo,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./lib/todoHelpers";
import { pipe, partial } from "./lib/utils";
import { Footer } from "./components/todo/Footer";
import { UserContext } from "./index";
import {
  loadTodos,
  createTodo,
  saveTodo,
  destroyTodo
} from "./lib/todoService";

function App() {
  const routeContext = useContext(UserContext);

  const [todos, setTodos] = useState([]);

  const [currentTodo, setCurrentTodo] = useState("");
  const [errors, SetError] = useState({ errorMessage: "" });
  const [success, SetSuccess] = useState({ message: "" });

  const handleInputChange = evt => {
    setCurrentTodo(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = {
      name: currentTodo,
      isComplete: false
    };
    const updatedTodos = addTodo(todos, newTodo);
    setTodos(updatedTodos);
    SetError({ errorMessage: "" });
    setCurrentTodo("");
    createTodo(newTodo).then(() => showTemMessage("Todo Added"));
  };

  const showTemMessage = msg => {
    SetSuccess({ message: msg });
    setTimeout(() => SetSuccess(""), 2000);
  };

  const handlerEmptySubmit = evt => {
    evt.preventDefault();
    SetError({ errorMessage: "Este campo no puede estar vacio" });
  };

  const handleToggle = id => {
    const getToggledTodo = pipe(
      findById,
      toggleTodo
    );
    const updated = getToggledTodo(id, todos);
    const getUpdatedTodos = partial(updateTodo, todos);
    const udpatedTodos = getUpdatedTodos(id, todos);
    saveTodo(udpatedTodos).then(() =>
      showTemMessage(`Todo ${updated.id} Updated`)
    );
    setTodos(udpatedTodos);
  };
  const handleRemove = (id, evt) => {
    evt.preventDefault();
    const updateTodos = removeTodo(todos, id);
    setTodos(updateTodos);
    destroyTodo(id).then(() => showTemMessage(`Todo ${id} Deleted`));
  };
  useEffect(() => {
    loadTodos().then(res => setTodos(res));
  }, []);
  const submitHandler = currentTodo ? handleSubmit : handlerEmptySubmit;
  const filteredTodos = filterTodos(todos, routeContext.route);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        TODO App
      </header>

      <div className="Todo-App">
        {errors && <span className="error">{errors.errorMessage}</span>}
        {success && <span className="success">{success.message}</span>}
        <TodoForm
          handleInputChange={handleInputChange}
          currentTodo={currentTodo}
          handleSubmit={submitHandler}
        ></TodoForm>
        <TodoList
          handleRemove={handleRemove}
          handleToggle={handleToggle}
          todos={filteredTodos}
        ></TodoList>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;

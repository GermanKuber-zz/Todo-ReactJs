import { link } from "fs";

export const addTodo = (list, item) => [...list, { ...item, id: generateId() }];

const generateId = () => Math.floor(Math.random() * 100000);

export const findById = (id, list) => list.find(item => item.id === id);

export const toggleTodo = todo => ({ ...todo, isComplete: !todo.isComplete });

export const updateTodo = (list, todo) => {
  const updateIndex = list.findIndex(item => item.id == todo.id);
  return [...list.slice(0, updateIndex), todo, ...list.slice(updateIndex + 1)];
};

export const removeTodo = (list, id) => {
  var deleteIndex = list.findIndex(item => item.id == id);
  return [...list.slice(0, deleteIndex), ...list.slice(deleteIndex + 1)];
};

export const filterTodos = (list, route) => {
  switch (route) {
    case "/active":
      return list.filter(item => !item.isComplete);
    case "/complete":
      return list.filter(item => item.isComplete);
    default:
      return list;
  }
};

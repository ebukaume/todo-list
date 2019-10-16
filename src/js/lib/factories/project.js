const project = ({ id, name }) => {
  const todos = {};

  const addTodo = (todo) => {
    todos[todo.id] = todo;
  };

  const deleteTodo = (todo) => {
    delete todos[todo.id];
  };

  return {
    id,
    name,
    todos,
    addTodo,
    deleteTodo,
  };
};

export default project;

import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const app = (() => {
  let DB = { 1: { id: 1, name: 'Demo Project!', todos: {} } };

  const initialize = () => {
    DB = storage.fetch() || DB;
    storage.store(DB);
  };

  const getDB = () => DB;

  const createProject = ({ name }) => {
    const id = idGenerator();
    const newProject = project({
      id,
      name,
    });

    DB[newProject.id] = newProject;
    storage.store(DB);

    return newProject;
  };

  const deleteProject = ({ id }) => {
    delete DB[id];
    storage.store(DB);

    return DB;
  };

  const editProject = ({ id, name }) => {
    DB[id].name = name;
    storage.store(DB);

    return DB;
  };

  const getProject = ({ id }) => DB[id];

  const createTodo = ({
    projectId, title, desc, dueDate, priority,
  }) => {
    if (DB[projectId] === undefined) return false;

    const newTodo = todo({
      id: idGenerator(),
      title,
      desc,
      dueDate,
      priority,
    });
    DB[projectId].todos[newTodo.id] = newTodo;
    storage.store(DB);

    return newTodo;
  };

  const deleteTodo = ({ projectId, todoId }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    delete targetProject.todos[todoId];
    storage.store(DB);

    return DB;
  };

  const editTodo = ({
    projectId, todoId, title, desc, dueDate, priority,
  }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    const targetTodo = targetProject.todos[todoId];

    if (title) targetTodo.title = title;
    if (desc) targetTodo.desc = desc;
    if (dueDate) targetTodo.dueDate = dueDate;
    if (priority) targetTodo.priority = priority;
    storage.store(DB);

    return DB;
  };

  const toggleTodoStatus = ({ projectId, todoId }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    targetProject.todos[todoId].isDone = targetProject.todos[todoId].isDone === false;
    storage.store(DB);

    return targetProject;
  };

  return {
    initialize,
    createProject,
    deleteProject,
    editProject,
    getProject,
    getDB,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  };
})();

export default app;

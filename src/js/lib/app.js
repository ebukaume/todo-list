import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const app = (() => {
  let DB = {};

  const getDB = () => DB;

  const initialize = () => {
    DB = storage.fetch();
    return DB;
  };

  const createProject = ({
    name,
  }) => {
    const newProject = project({
      id: idGenerator(),
      name,
    });

    DB[newProject.id] = newProject;
    storage.store(DB);

    return DB;
  };

  const deleteProject = ({
    id,
  }) => {
    delete DB[id];
    storage.store(DB);

    return DB;
  };

  const editProject = ({
    id,
    name,
  }) => {
    DB[id].name = name;
    storage.store(DB);

    return DB;
  };

  const getProject = ({
    id,
  }) => DB[id];


  const createTodo = ({
    projectId,
    title,
    desc,
    dueDate,
    priority,
  }) => {
    if (DB[projectId] === undefined) return false;

    const newTodo = todo({
      id: idGenerator(),
      title,
      desc,
      dueDate,
      priority,
    });
    DB[projectId].todos[todo.id] = newTodo;
    storage.store(DB);

    return newTodo;
  };

  const deleteTodo = ({
    projectId,
    todoId,
  }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    delete targetProject.todos[todoId];
    storage.store(DB);

    return DB;
  };

  const editTodo = ({
    projectId,
    todoId,
    title,
    desc,
    dueDate,
    priority,
  }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    const targetTodo = targetProject[todoId];
    if (title) targetTodo.title = title;
    if (desc) targetTodo.desc = desc;
    if (dueDate) targetTodo.dueDate = dueDate;
    if (priority) targetTodo.priority = priority;
    storage.store(DB);

    return DB;
  };

  const toggleTodoStatus = ({
    projectId,
    todoId,
  }) => {
    const targetProject = DB[projectId];

    if (targetProject === undefined) return false;
    targetProject[todoId].isDone = targetProject[todoId].isDone === false;
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
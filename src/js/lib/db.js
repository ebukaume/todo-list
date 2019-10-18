import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const DB = (() => {
  let status = {
    1: {
      id: 1,
      name: 'welcome!',
      todos: {
        1: {
          id: 1,
          title: 'new todo',
          desc: 'No Description',
          dueDate: '',
          priority: '',
        },
      },
    },
  };

  const initialize = () => {
    status = storage.fetch() || status;
    storage.store(status);
  };

  const createProject = ({ name }) => {
    const id = idGenerator();
    const newProject = project({
      id,
      name,
    });

    status[newProject.id] = newProject;
    storage.store(status);

    return newProject;
  };

  const deleteProject = ({ id }) => {
    delete status[id];
    storage.store(status);

    return status;
  };

  const editProject = ({ id, name }) => {
    status[id].name = name;
    storage.store(status);

    return status;
  };

  const getProject = ({ id }) => status[id];

  const getAll = () => Object.keys(status).map((id) => status[id]);

  const createTodo = ({
    projectId, title, desc, dueDate, priority,
  }) => {
    if (status[projectId] === undefined) return false;

    const newTodo = todo({
      id: idGenerator(),
      title,
      desc,
      dueDate,
      priority,
    });
    status[projectId].todos[newTodo.id] = newTodo;
    storage.store(status);

    return newTodo;
  };

  const deleteTodo = ({ projectId, todoId }) => {
    const targetProject = status[projectId];

    if (targetProject === undefined) return false;
    delete targetProject.todos[todoId];
    storage.store(status);

    return status;
  };

  const editTodo = ({
    projectId, todoId, title, desc, dueDate, priority,
  }) => {
    const targetProject = status[projectId];

    if (targetProject === undefined) return false;
    const targetTodo = targetProject.todos[todoId];

    if (title) targetTodo.title = title;
    if (desc) targetTodo.desc = desc;
    if (dueDate) targetTodo.dueDate = dueDate;
    if (priority) targetTodo.priority = priority;
    storage.store(status);

    return status;
  };

  const toggleTodoStatus = ({ projectId, todoId }) => {
    const targetProject = status[projectId];

    if (targetProject === undefined) return false;
    targetProject.todos[todoId].isDone = targetProject.todos[todoId].isDone === false;
    storage.store(status);

    return targetProject;
  };

  return {
    initialize,
    createProject,
    deleteProject,
    editProject,
    getProject,
    getAll,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  };
})();

export default DB;

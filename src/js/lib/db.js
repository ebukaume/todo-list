import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const DB = (() => {
  let db = {
    1: {
      id: 1,
      name: 'welcome!',
      todos: {
        1: {
          id: 1,
          title: 'new todo',
          desc: 'No Description',
          dueDate: '',
          priority: '2',
        },
      },
    },
  };

  const initialize = () => {
    db = storage.fetch() || db;
    storage.store(db);
  };

  const createProject = ({ name }) => {
    const id = idGenerator();
    const newProject = project({
      id,
      name,
    });

    db[newProject.id] = newProject;
    storage.store(db);

    return newProject;
  };

  const deleteProject = ({ id }) => {
    delete db[id];
    storage.store(db);

    return db;
  };

  const editProject = ({ id, name }) => {
    db[id].name = name;
    storage.store(db);

    return db;
  };

  const getProject = ({ id }) => db[id];

  const getAll = () => Object.keys(db).map((id) => db[id]);

  const createTodo = ({
    projectId, title, desc, dueDate, priority,
  }) => {
    if (db[projectId]) {
      const newTodo = todo({
        id: idGenerator(),
        title,
        desc,
        dueDate,
        priority,
      });
      db[projectId].todos[newTodo.id] = newTodo;
      storage.store(db);

      return newTodo;
    }
    return false;
  };

  const deleteTodo = ({ projectId, todoId }) => {
    const targetProject = db[projectId];

    if (targetProject) {
      delete targetProject.todos[todoId];
      storage.store(db);

      return db;
    }
    return false;
  };

  const editTodo = ({
    projectId, todoId, title, desc, dueDate, priority,
  }) => {
    const targetProject = db[projectId];

    if (targetProject) {
      const targetTodo = targetProject.todos[todoId];

      if (title) targetTodo.title = title;
      if (desc) targetTodo.desc = desc;
      if (dueDate) targetTodo.dueDate = dueDate;
      if (priority) targetTodo.priority = priority;
      storage.store(db);

      return db;
    }
    return false;
  };

  const toggleTodoStatus = ({ projectId, todoId }) => {
    const targetProject = db[projectId];

    if (!targetProject) return false;
    targetProject.todos[todoId].isDone = targetProject.todos[todoId].isDone === false;
    storage.store(db);

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

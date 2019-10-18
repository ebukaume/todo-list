import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const DB = (() => {
  const db = {};

  const demo = {
    1: {
      id: 1,
      name: 'welcome!',
      todos: {
        2: {
          id: 2, title: 'Kill me', desc: 'This is unhealthy', dueDate: 1569963600000,
        },
      },
    },
  };

  const createProject = ({ id, name }) => {
    if (db[id]) return false;

    const newProject = project({
      id: id || idGenerator(),
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
    projectId, id, title, desc, dueDate, priority, isDone,
  }) => {
    if (db[projectId].todos[id]) return false;

    if (db[projectId]) {
      const newTodo = todo({
        id: id || idGenerator(),
        title,
        desc,
        dueDate,
        priority,
        isDone,
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
    const targetTodo = db[projectId].todos[todoId];

    if (targetTodo) {
      targetTodo.isDone = !targetTodo.isDone;
      storage.store(db);

      return targetTodo;
    }
    return false;
  };

  const toggleTodoPriority = ({ projectId, todoId }) => {
    const targetTodo = db[projectId].todos[todoId];
    if (targetTodo) {
      targetTodo.priority = targetTodo.priority === '1' ? '2' : '1';
      storage.store(db);
      return targetTodo;
    }
    return false;
  };

  const createFromHash = (storageFetch) => {
    Object.keys(storageFetch).forEach((projectId) => {
      const project = storageFetch[projectId];
      createProject({ id: projectId, name: project.name });

      Object.keys(project.todos).forEach((todoId) => {
        const todo = project.todos[todoId];
        createTodo({ projectId, ...todo });
      });
    });
  };

  const initialize = () => {
    const storageFetch = storage.fetch();
    if (storageFetch && Object.keys(storageFetch).length > 0) {
      createFromHash(storageFetch);
    } else {
      createFromHash(demo);
    }
    storage.store(db);
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
    toggleTodoPriority,
  };
})();

export default DB;

import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const DB = (() => {
  const db = {};

  const demo = '{"1":{"id":"1","name":"welcome!","todos":{"818774414504":{"id":818774414504,"desc":"You can find the add todo item button at the bottom","title":"Create a New Todo Item","dueDate":null,"isDone":false,"priority":"2"},"1090049441464":{"id":1090049441464,"desc":"To avoid very long titles like that!","title":"You can expand each item to see and edit its description","dueDate":null,"isDone":false,"priority":"2"},"1394825007653":{"id":1394825007653,"desc":"You can schedule yours too!","title":"This one is Scheduled","dueDate":1572472800000,"isDone":false,"priority":"2"},"825061343273":{"id":825061343273,"desc":"","title":"This is one is past Due","dueDate":1570050000000,"isDone":false,"priority":"2"},"1500316958504":{"id":1500316958504,"desc":"","title":"This one is already done, no? so uncheck it!","dueDate":null,"isDone":true,"priority":"2"},"927933235701":{"id":927933235701,"desc":"Because reasons.","title":"This one is prioritized with a red flag!","dueDate":null,"isDone":false,"priority":"1"},"504366975793":{"id":504366975793,"desc":"Look to the left.","title":"Ok now go start your own project!","dueDate":null,"isDone":false,"priority":"2"}}}}';

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
    const project = db[id];
    if (project) {
      delete db[id];
      storage.store(db);

      return db;
    }
    return false;
  };

  const editProject = ({ id, name }) => {
    const project = db[id];
    if (project) {
      db[id].name = name;
      storage.store(db);

      return db;
    }
    return false;
  };

  const getProject = ({ id }) => db[id];

  const getAll = () => Object.keys(db).map((id) => db[id]);

  const createTodo = ({
    projectId,
    id,
    title,
    desc,
    dueDate,
    priority,
    isDone,
  }) => {
    const project = db[projectId];

    if (project) {
      if (project.todos[id]) return false;

      const newTodo = todo({
        id: id || idGenerator(),
        title,
        desc,
        dueDate,
        priority,
        isDone,
      });
      project.todos[newTodo.id] = newTodo;
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

  const checkTodoExists = ({ projectId, todoId }) => {
    const targetProject = db[projectId];
    if (targetProject) {
      const targetTodo = targetProject.todos[todoId];
      return targetTodo;
    }
    return false;
  };

  const editTodo = ({
    projectId, todoId, title, desc, dueDate,
  }) => {
    const targetTodo = checkTodoExists({ projectId, todoId });
    if (targetTodo) {
      if (title) targetTodo.title = title;
      if (desc) targetTodo.desc = desc;
      if (dueDate) targetTodo.dueDate = dueDate;
      storage.store(db);

      return db;
    }
    return false;
  };

  const toggleTodoStatus = ({ projectId, todoId }) => {
    const targetTodo = checkTodoExists({ projectId, todoId });
    if (targetTodo) {
      targetTodo.isDone = !targetTodo.isDone;
      storage.store(db);

      return targetTodo;
    }
    return false;
  };

  const toggleTodoPriority = ({ projectId, todoId }) => {
    const targetTodo = checkTodoExists({ projectId, todoId });
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
      createFromHash(JSON.parse(demo));
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

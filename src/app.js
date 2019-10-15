import storage from './localstorage';
import project from './factories/project';
import todo from './factories/todo';
import idGenerator from './util/id_generator';

const app = (() => {
  const createProject = ({ name }) => {
    const newProject = project({ id: idGenerator(), name });

    const projects = storage.fetch();
    projects[newProject.id] = newProject;
    storage.store(projects);

    return projects;
  };

  const deleteProject = ({ id }) => {
    const projects = storage.fetch();
    delete projects[id];
    storage.store(projects);

    return projects;
  };

  const editProject = ({ id, name }) => {
    const projects = storage.fetch();
    projects[id].name = name;
    storage.store(projects);

    return projects;
  };

  const getProject = ({ id }) => {
    const projects = storage.fetch();

    return projects[id];
  };

  const getAllProjects = () => storage.fetch();

  const createTodo = ({
    projectId, title, desc, dueDate, priority,
  }) => {
    const projects = storage.fetch();
    if (projects[projectId] === undefined) return false;

    const newTodo = todo({
      id: idGenerator(), title, desc, dueDate, priority,
    });
    projects[projectId].todos[todo.id] = newTodo;
    storage.store(projects);

    return newTodo;
  };

  const deleteTodo = ({ projectId, todoId }) => {
    const projects = storage.fetch();
    const targetProject = projects[projectId];

    if (targetProject === undefined) return false;
    delete targetProject.todos[todoId];
    storage.store(projects);

    return projects;
  };

  const editTodo = ({
    projectId, todoId, title, desc, dueDate, priority,
  }) => {
    const projects = storage.fetch();
    const targetProject = projects[projectId];

    if (targetProject === undefined) return false;
    const targetTodo = targetProject[todoId];
    if (title) targetTodo.title = title;
    if (desc) targetTodo.desc = desc;
    if (dueDate) targetTodo.dueDate = dueDate;
    if (priority) targetTodo.priority = priority;
    storage.store(projects);

    return projects;
  };

  const toggleTodoStatus = ({ projectId, todoId }) => {
    const projects = storage.fetch();
    const targetProject = projects[projectId];

    if (targetProject === undefined) return false;
    targetProject[todoId].isDone = targetProject[todoId].isDone === false;
    storage.store(projects);

    return targetProject;
  };

  return {
    createProject,
    deleteProject,
    editProject,
    getProject,
    getAllProjects,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  };
})();

export default app;

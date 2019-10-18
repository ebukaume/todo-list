import UI from './ui.js';
import DB from './db';

const app = (() => {
  const initialize = () => {
    DB.initialize();
    return UI.initialize({
      projects: DB.getAll(),
    });
  };

  const createProject = ({ name }) => {
    const project = DB.createProject({
      name,
    });
    UI.renderAll({
      projects: DB.getAll(),
      project,
    });
  };

  const deleteProject = ({ projectId }) => {
    DB.deleteProject({
      id: projectId,
    });
    UI.renderAll({
      projects: DB.getAll(),
      project: DB.getProject(projectId),
    });
  };

  const editProject = ({ projectId, projectName }) => {
    if (projectName) {
      DB.editProject({
        id: projectId,
        name: projectName,
      });
    }
    UI.renderAll({
      projects: DB.getAll(),
      project: DB.getProject({
        id: projectId,
      }),
    });
  };

  const switchToProject = ({ projectId }) => {
    const project = DB.getProject({
      id: projectId,
    });
    UI.renderProject({
      project,
    });
  };

  const createTodo = ({
    projectId, title, desc, dueDate, priority,
  }) => {
    DB.createTodo({
      projectId,
      title,
      desc,
      dueDate,
      priority,
    });
    UI.hideAllInlineFroms();
    UI.renderProject({
      project: DB.getProject({ id: projectId }),
    });
  };

  const deleteTodo = ({ projectId, todoId }) => {
    DB.deleteTodo({ projectId, todoId });
    UI.renderProject({
      project: DB.getProject({ id: projectId }),
    });
  };

  return {
    initialize,
    createProject,
    deleteProject,
    editProject,
    switchToProject,
    createTodo,
    deleteTodo,
  };
})();

export default app;

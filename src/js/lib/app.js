import UI from './ui.js';
import DB from './db';

const app = (() => {
  const initialize = () => {
    DB.initialize();
    return UI.initialize({
      projects: DB.getAll(),
    });
  };

  const createProject = () => {};

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

  return {
    initialize,
    createProject,
    deleteProject,
    editProject,
  };
})();

export default app;

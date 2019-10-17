import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

app.initialize();
const { projectsList, projectHeader, createProjectForm } = UI.initialize({
  projects: app.getAllProjects(),
});

projectsList.addEventListener('click', (e) => {
  if (e.target.className === 'project-btn') {
    const projectID = e.target.getAttribute('data-id');
    const project = app.getProject({ id: projectID });
    UI.renderProject({ project });
  }
});

projectHeader.addEventListener('click', (e) => {
  if (e.target.id === 'project-delete-btn') {
    const projectID = e.target.getAttribute('data-id');
    app.deleteProject({ id: projectID });
    UI.renderAll({
      projects: app.getAllProjects(),
      project: app.getProject(projectID),
    });
  }
});

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  const project = app.createProject({ name });
  UI.renderAll({ projects: app.getAllProjects(), project });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(
    document.getElementById('create-project-form-modal'),
  ).close();
  createProjectForm.reset();
});

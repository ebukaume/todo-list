import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

app.initialize();
const { projectsList, projectHeader, createProjectForm } = UI.initialize({
  projects: app.getAll(),
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
      projects: app.getAll(),
      project: app.getProject(projectID),
    });
  } else if (e.target.id === 'project-name') {
    e.target.parentNode.classList.toggle('show-edit');
  } else if (e.target.id === 'submit-project-edit') {
    const projectID = e.target.getAttribute('data-id');
    const projectName = e.target.parentNode.children[0].value;
    app.editProject({ id: projectID, name: projectName });
    UI.renderAll({ projects: app.getAll(), project: app.getProject({ id: projectID }) });
  }
});

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  const project = app.createProject({ name });
  UI.renderAll({ projects: app.getAll(), project });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(
    document.getElementById('create-project-form-modal'),
  ).close();
  createProjectForm.reset();
});

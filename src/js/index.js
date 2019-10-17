import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

app.initialize();
const { projectsList, createProjectForm } = UI.initialize({
  projects: app.getAllProjects(),
});

console.log(app.getDB());

projectsList.addEventListener('click', (e) => {
  if (e.target.className === 'project-btn') {
    project = app.getProject({ id });
    UI.renderProject();
  }
});

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  const project = app.createProject({ name });
  UI.renderProjectsList({ projects: app.getAllProjects() });
  UI.renderProject({ project });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(
    document.getElementById('create-project-form-modal'),
  ).close();
  createProjectForm.reset();
});

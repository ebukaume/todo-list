import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

app.initialize();
UI.initialize(app.getDB());

const {
  createProjectForm,
} = UI.getInputs();

const addListenersToProjectsList = (projectsListDOM) => {
  Array.from(projectsListDOM.children).forEach((projectDOM) => {
    projectDOM.addEventListener('click', () => {
      console.log(projectDOM);
      const projectID = projectDOM.getAttribute('data-id');
      const project = app.getDB()[projectID];
      const projectHeaderDOM = UI.renderProject({ name: project.name });
      addListenersToProjectsHeader(projectHeaderDOM);
    });
  });
};

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;

  const newProject = app.createProject({ name });
  const projectsListDOM = UI.renderProjectsList(app.getDB());
  addListenersToProjectsList(projectsListDOM);
  UI.renderProject({ project: newProject });

  // eslint-disable-next-line no-undef
  M.Modal.getInstance(document.getElementById('create-project-form-modal')).close();
  createProjectForm.reset();
});


UI.getInputs().projectDeleteBtn.addEventListener('click', () => {
  console.log(this);
  const id = this.getAttribute('data-id');
  app.deleteProject({ id });
});

console.log(app.getDB());
import '../scss/main.scss';
import UI from './lib/ui.js';
import DB from './lib/db';
import App from './lib/app';

const { projectsList, projectArea, createProjectForm } = App.initialize();

projectArea.addEventListener('click', (e) => {
  const { target } = e;
  const projectId = projectArea.children[0].children[0].getAttribute('data-id');

  if (target.id === 'project-delete-btn') {
    App.deleteProject({ projectId });
  } else if (target.id === 'project-name') {
    target.parentNode.classList.toggle('show-edit');
  } else if (target.id === 'submit-project-edit') {
    const projectName = target.parentNode.parentNode.children[0].value;
    App.editProject({ projectId, projectName });
  } else if (target.getAttribute('data-id') === 'cancel') {
    target.parentNode.classList.toggle('hide');
    target.parentNode.reset();
  } else if (target.id === 'add-todo-btn') {
    target.parentNode.children[1].classList.toggle('hide');
  }
});

projectArea.addEventListener('submit', (e) => {
  const { target } = e;
  if (target.id === 'add-todo-form') {
    const projectId = target.getAttribute('data-id');
    const title = target.children[0].children[0].value;
    const desc = target.children[1].children[0].value;
    const priority = target.children[2].children[0].value;
    const dueDate = new Date(target.children[2].children[2].value);

    DB.createTodo({
      projectId,
      title,
      desc,
      dueDate,
      priority,
    });
    UI.renderAll({
      projects: DB.getAll(),
      project: DB.getProject({
        id: projectId,
      }),
    });
    target.classList.toggle('hide');
    target.reset();
  }
});

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  const project = DB.createProject({
    name,
  });
  UI.renderAll({
    projects: DB.getAll(),
    project,
  });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(
    document.getElementById('create-project-form-modal'),
  ).close();
  createProjectForm.reset();
});

projectsList.addEventListener('click', (e) => {
  if (e.target.className === 'project-btn') {
    const projectId = e.target.getAttribute('data-id');
    const project = DB.getProject({
      id: projectId,
    });
    UI.renderProject({
      project,
    });
  }
});

import '../scss/main.scss';
import App from './lib/app';
import DB from './lib/db';
import UI from './lib/ui';

const { projectsList, projectArea, createProjectForm } = App.initialize();

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  App.createProject({ name });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(createProjectForm.parentNode.parentNode).close();
  createProjectForm.reset();
});

projectsList.addEventListener('click', (e) => {
  if (e.target.className === 'project-btn') {
    const projectId = e.target.getAttribute('data-id');
    App.switchToProject({ projectId });
  }
});

const projectAreaHanlder = (e) => {
  const { target } = e;
  const projectId = projectArea.children[0].children[0].getAttribute('data-id');
  if (target.id === 'project-delete-btn') {
    App.deleteProject({ projectId });
  } else if (target.id === 'submit-project-edit') {
    const projectName = target.parentNode.parentNode.children[0].value;
    App.editProject({ projectId, projectName });
  } else if (target.id === 'add-todo-form') {
    const title = target.children[0].children[0].value;
    const desc = target.children[1].children[0].value;
    const priority = target.children[2].children[0].value;
    const dueDate = new Date(target.children[2].children[2].value);

    App.createTodo({
      projectId,
      title,
      desc,
      dueDate,
      priority,
    });
    UI.hideAllInlineFroms();
  } else if (target.id === 'edit-header-form') {
    e.preventDefault();
    const projectName = target.children[0].value;
    App.editProject({ projectId, projectName });
    UI.hideAllInlineFroms();
  }
};

projectArea.addEventListener('click', projectAreaHanlder);
projectArea.addEventListener('submit', projectAreaHanlder);

console.log(DB.getAll());

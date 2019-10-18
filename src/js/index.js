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
  } else if (target.id === 'edit-header-form') {
    e.preventDefault();
    const projectName = target.children[0].value;
    App.editProject({ projectId, projectName });
    UI.hideAllInlineFroms();
  } else if (target.id === 'add-todo-form') {
    App.createTodo({
      projectId,
      title: target.children[0].children[0].value,
      dueDate: new Date(target.children[0].children[2].value).getTime(),
      desc: target.children[1].children[0].value,
    });
  } else if (target.getAttribute('data-id') === 'todo-delete-btn') {
    App.deleteTodo({ projectId, todoId: target.id });
  } else if (target.getAttribute('data-id') === 'todo-flag') {
    App.toggleTodoPriority({ projectId, todoId: target.id });
  } else if (target.type === 'checkbox') {
    App.toggleTodoStatus({ projectId, todoId: target.id });
  }
};

projectArea.addEventListener('click', projectAreaHanlder);
projectArea.addEventListener('submit', projectAreaHanlder);

console.log('database:', DB.getAll());

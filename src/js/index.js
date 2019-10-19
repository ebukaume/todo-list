import '../scss/main.scss';
import { da } from 'date-fns/locale';
import App from './lib/app';

const { projectsList, projectArea, createProjectForm } = App.initialize();

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  App.createProject({
    name: createProjectForm[0].value,
  });
  // eslint-disable-next-line no-undef
  M.Modal.getInstance(createProjectForm.parentNode.parentNode).close();
  createProjectForm.reset();
});

projectsList.addEventListener('click', (e) => {
  if (e.target.className === 'project-btn') {
    App.switchToProject({
      projectId: e.target.getAttribute('data-id'),
    });
  }
});

const getTodoFormElements = ({ form }) => {
  const { elements } = form;
  const { length } = elements;
  return [
    form[0],
    form[length - 3],
    form[length - 2],
  ];
};

const projectAreaHanlder = (e) => {
  const { target } = e;
  const projectId = document
    .getElementById('projectId')
    .getAttribute('data-id');

  if (target.id === 'project-delete-btn') {
    App.deleteProject({ projectId });
  } else if (target.id === 'edit-header-form') {
    e.preventDefault();
    App.editProject({
      projectId,
      projectName: target.children[0].value,
    });
  } else if (target.getAttribute('data-id') === 'todo-delete-btn') {
    App.deleteTodo({
      projectId,
      todoId: target.id,
    });
  } else if (target.getAttribute('data-id') === 'todo-flag') {
    App.toggleTodoPriority({
      projectId,
      todoId: target.id,
    });
  } else if (target.type === 'checkbox') {
    App.toggleTodoStatus({
      projectId,
      todoId: target.id,
    });
  } else if (target.id === 'add-todo-form') {
    const formElements = getTodoFormElements({ form: target });
    App.createTodo({
      projectId,
      title: formElements[0].value,
      dueDate: new Date(formElements[1].value).getTime(),
      desc: formElements[2].value,
    });
  } else if (target.className === 'edit-todo-form') {
    const formElements = getTodoFormElements({ form: target });
    e.preventDefault();
    App.editTodo({
      projectId,
      todoId: target.getAttribute('data-id'),
      title: formElements[0].value,
      dueDate: new Date(formElements[1].value).getTime(),
      desc: formElements[2].value,
    });
  }
};

projectArea.addEventListener('click', projectAreaHanlder);
projectArea.addEventListener('submit', projectAreaHanlder);
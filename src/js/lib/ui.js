const UI = (() => {
  const renderStaticHtml = () => {
    document.getElementById('content').innerHTML = `
  <nav class="navbar-fixed">
  <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
  <div class="max-width">
    <a href="#" class="text-off-white">
      <i class="large material-icons">today</i>
      <h1>Todos</h1>
    </a>
  </div>
</nav>
<div id="create-project-form-modal" class="modal">
  <div class="modal-content grey darken-4">
    <form id="create-project-form" action="#">
      <h6 class="bold">Add project</h6>
      <div class="input-field">
      <label>Project name</label>
        <input type="text" name="title" id="title" class="validate"
          required="" aria-required="true">
      </div>
      <button id="submit" class="red accent-4 modal-action btn waves-effect waves-light" type="submit"
        name="action">
        Submit
      </button>
    </form>
  </div>
</div>
<main>
  <div class="max-width">
    <ul id="nav-mobile projects-side-nav" class="sidenav sidenav-fixed ">
      <li>
        <a class=" modal-trigger" href="#create-project-form-modal">
          <i class="material-icons">view_module</i>
          Projects
          <i class="material-icons right">add</i>
        </a>
      </li>
      <div class="divider"></div>
      <div id="projects-list">
      </div>
      <li id="add-project-btn">
        <a class=" modal-trigger" href="#create-project-form-modal">
          Add Project
          <i class="material-icons red-text">add</i>
        </a>
      </li>
    </ul>
    <div class="todos-area" id="project-area">
    <table>
      <thead >
        <div id="project-header">
        </div>
        <div class="divider"></div>
      </thead>
      <tbody id="project-todos">
      </tbody>
    </table>
    <ul class="todo-row">
      <li id="add-todo">
        <a id="add-todo-btn" href="#!">
          Add Todo Item
          <i class="material-icons left red-text">add</i>
        </a>
        <form id="add-todo-form" class="hide">
          <div class="row">
            <input placeholder="Title" type="text" required="" aria-required="true" class="validate">
          </div>
          <div class="row">
          <input placeholder="Description" type="text" required="" aria-required="true" class="validate">
          </div>
          <div class="row date">
            <input placeholder="Priority" min="1" max="2" type="number" class="validate">
            <input type="text" placeholder="Date" class="datepicker">
          </div>
          <button id="submit" class="right red accent-4 modal-action btn waves-effect waves-light" type="submit"
            name="action">
            Submit
          </button>
          <a class="right grey accent-4 modal-action btn waves-effect waves-light" data-id="cancel" name="action">
            Cancel
          </a>
        </form>
      </li>
    </ul>
  </div>
  </div>
</main>
  `;
  };

  let createProjectForm;
  let projectsList;
  let projectTodos;
  let projectArea;
  let projectHeader;

  const renderTodos = ({ todosHash }) => {
    let html = '';
    const todos = Object.keys(todosHash).map((id) => todosHash[id]);
    todos.forEach((todo) => {
      html += `
      <tr class="todo-row show-edit">
        <td>
          <label>
            <input type="checkbox" />
            <span>${todo.title}</span>
          </label>
        </td>
        <td class="edit todo-form">
          <div>
            <input value="${todo.title}" id="first_name" 
            type="text" class="validate">
          </div>
          <div>asd</div>
        </td>
        <td>
          <button id="submit-project-edit" data-id="${todo.id}" name="action"
            class="red accent-4 modal-action btn waves-effect waves-light" type="submit">
            Submit
          </button>
        </td>
      </tr>
      `;
    });
    projectTodos.innerHTML = html;
  };

  const renderProject = ({ project }) => {
    const projectName = project.name;
    const projectId = project.id;
    const projectTodos = project.todos;
    const html = `
                <div id="projectId" data-id="${projectId}" class="hide"></div>
                <div>
                  <h5 id="project-name" class="base">${projectName}
                    <i id="project-delete-btn" class="material-icons right grey-text">
                      delete
                    </i>
                  </h5>

                  <div class="edit">
                    <input value="${projectName}" id="first_name" type="text" autofocus
                    required="" aria-required="true" class="validate">
                    <div>
                      <button id="submit-project-edit" name="action"
                        class="right red accent-4 modal-action btn waves-effect waves-light" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
`;
    projectHeader.innerHTML = html;
    renderTodos({ todosHash: projectTodos });
  };

  const renderProjectsList = ({ projects }) => {
    let html = '';
    projects.forEach((project) => {
      html += `
      <li ">
        <a href="#!" class="project-btn" data-id="${project.id}">
          ${project.name}
        </a>
      </li>
      `;
    });
    projectsList.innerHTML = html;
  };

  const updateDomElements = () => {
    createProjectForm = document.getElementById('create-project-form');
    projectsList = document.getElementById('projects-list');
    projectArea = document.getElementById('project-area');
    projectTodos = document.getElementById('project-todos');
    projectHeader = document.getElementById('project-header');
  };

  const renderAll = ({ projects, project }) => {
    renderProjectsList({ projects });
    renderProject({ project: project || projects[0] });
  };

  const addStaticEventListeners = () => {
    document.getElementById('content').addEventListener('click', (e) => {
      const { target } = e;
      if (target.id === 'project-name') {
        target.parentNode.classList.toggle('show-edit');
      } else if (target.getAttribute('data-id') === 'cancel') {
        target.parentNode.classList.toggle('hide');
        target.parentNode.reset();
      } else if (target.id === 'add-todo-btn') {
        target.parentNode.children[1].classList.toggle('hide');
      }
    });

    projectArea.addEventListener('focusout', (e) => {
      const { target } = e;
      Array.from(document.querySelectorAll('.show-edit')).forEach((node) => {
        node.classList.remove('show-edit');
      });
    });
  };

  const initialize = ({ projects }) => {
    renderStaticHtml();
    updateDomElements();
    renderAll({ projects });
    addStaticEventListeners();

    return {
      projectsList,
      projectArea,
      projectTodos,
      createProjectForm,
    };
  };

  return {
    initialize,
    renderProjectsList,
    renderProject,
    renderAll,
  };
})();

export default UI;

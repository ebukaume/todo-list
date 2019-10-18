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
        <input type="text" name="title" id="title" class="validate" autocomplete="off"
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
    <ul id="nav-mobile" class="sidenav sidenav-fixed ">
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
        <div id="project-header" >
        </div>
        <div class="divider"></div>
      </thead>
      <tbody id="project-todos" class="project-todos">
      </tbody>
    </table>
    <ul class="todo-row">
      <li id="add-todo" class="hide-inline-form hidden">
        <a id="add-todo-btn" href="#!" class="base">
          Add Todo Item
          <i class="material-icons left red-text">add</i>
        </a>
        <form id="add-todo-form" class="inline-form">
          <div class="row">
            <input placeholder="Title" type="text"  required="" aria-required="true" class="validate">
            <input type="text" placeholder="Schedule" class="datepicker">
          </div>
          <div class="row">
            <input placeholder="Description" type="text"  class="validate">
            <input placeholder="Priority" min="1" max="2" type="number" class="validate">
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
      const { id } = todo;
      const checked = todo.isDone ? 'checked="checked"' : '';
      const priority = todo.priority === '1' ? 'red-text' : '';
      const dueDate = todo.dueDate || '';
      html += `
        <tr class="hide-inline-form hidden">
          <td>
            <label >
            <input type="checkbox" class="filled-in checkbox-red"
             ${checked} />
             <span class="${priority}" ></span>
            </label>
            <span class="truncate">${todo.title} </span>
          </td>
          <td>
          <span>${dueDate}</span>
              <i class="${priority} tiny material-icons right">flag</i>
              <i data-id="todo-delete-btn" id="${id}" class=" tiny  material-icons right grey-text">
                delete
              </i>
          </td>
          <td class="inline-form">
            asdas
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
                <div class="hide-inline-form hidden">
                  <h5 id="project-name" class="base">${projectName}
                    <i id="project-delete-btn" class=" material-icons right grey-text">
                      delete
                    </i>
                  </h5>

                  <div class="inline-form">
                    <form id="edit-header-form" >
                      <input value="${projectName}" type="text" required="" aria-required="true" class="validate">
                      <div>
                        <button id="submit" class="right red accent-4 modal-action btn waves-effect waves-light" type="submit"
                          name="action">
                          Submit
                        </button>
                        <button class="right grey accent-4 modal-action btn waves-effect waves-light"
                         data-id="cancel" type="button" name="action">
                          Cancel
                        </button>
                      </div>
                    </form>
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

  const hideAllInlineFroms = () => {
    Array.from(document.getElementsByClassName('hide-inline-form')).forEach(
      (node) => {
        node.classList.add('hidden');
      },
    );
    Array.from(document.getElementsByTagName('form')).forEach((form) => {
      form.reset();
    });
  };

  const findInEventPath = ({ path, className }) => {
    let node;
    path.some((_node) => {
      node = _node;
      return Array.from(node.classList).includes(className);
    });
    return node;
  };

  const showInlineForm = ({ path }) => {
    hideAllInlineFroms();
    findInEventPath({
      path,
      className: 'hide-inline-form',
    }).classList.remove('hidden');
    Array.from(document.getElementsByTagName('form')).forEach((form) => {
      if (form.offsetParent) { form.elements[0].focus(); }
    });
  };

  const addStaticEventListeners = () => {
    document.getElementById('content').addEventListener('click', (e) => {
      const { target } = e;
      const { path } = e;

      if (target.id === 'project-name' || target.id === 'add-todo-btn') {
        showInlineForm({ path });
      } else if (target.getAttribute('data-id') === 'cancel') {
        hideAllInlineFroms();
      }
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
    hideAllInlineFroms,
  };
})();

export default UI;

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
        <input type="text" name="title" id="title" class="validate" autofocus autocomplete="off"
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
    <div>
      <div >
        <div id="project-header" >
        </div>
        <div class="divider"></div>
      </div>
      <div id="project-todos" class="project-todos">
      </div>
    </div>
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
          <div class="row2">
            <input placeholder="Description" type="text"  class="validate">
          </div>
          <button id="submit" class="left red accent-4 btn waves-effect waves-light" type="submit"
            name="action">
            Add todo element
          </button>
          <a class="left btn-flat waves-effect waves-light" data-id="cancel" name="action">
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

  const updateDomElements = () => {
    createProjectForm = document.getElementById('create-project-form');
    projectsList = document.getElementById('projects-list');
    projectArea = document.getElementById('project-area');
    projectTodos = document.getElementById('project-todos');
    projectHeader = document.getElementById('project-header');
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


  const renderTodos = ({ todosHash }) => {
    let html = '';
    const todos = Object.keys(todosHash).map((id) => todosHash[id]);
    todos.forEach((todo) => {
      const { id, title, desc } = todo;
      const checked = todo.isDone ? 'checked="checked"' : '';
      const priority = todo.priority === '1' ? 'red-text' : '';
      const dueDateFormatted = todo.dueDateFormatted();
      const dateBadge = dueDateFormatted
        ? `<span class="new red badge">${dueDateFormatted}</span>`
        : '';
      const formSchedulePlaceholder = dueDateFormatted || 'schedule';
      html += `
        <div id="todos-row" class="hide-inline-form hidden ">
          <div class="base">
            <div >
              <label >
              <input id="${id}" type="checkbox" class="filled-in checkbox-red"
              ${checked} />
              <span class="${priority}" ></span>
              </label>
              <span class="truncate">${title} </span>
            </div>
            <div >
                ${dateBadge}
                <i data-id="todo-flag" id="${id}" class="${priority} tiny material-icons right">flag</i>
                <i data-id="todo-delete-btn" id="${id}" class=" tiny  material-icons right grey-text">
                  delete
                </i>
            </div>
          </div>
          <div class="inline-form">
            <form data-id="${id}" class="edit-todo-form">
              <div class="row">
                <input value="${title}" type="text" required="" aria-required="true" class="validate">
                <input type="text" placeholder="${formSchedulePlaceholder}" class="datepicker">
              </div>
              <div class="row2">
                <input value="${desc}"  placeholder="Description" type="text" class="validate truncate">
              </div>
              <div class="row3">
                <button id="submit" class="left red accent-4 btn waves-effect waves-light" type="submit" name="action">
                  Save
                </button>
                <a class="left btn-flat waves-effect waves-light" data-id="cancel" name="action">
                  Cancel
                </a>
              </div>
            </form>
    
          </div>
          </div>

          `;
    });

    projectTodos.innerHTML = html;

    const elems = document.querySelectorAll('.datepicker');
    // eslint-disable-next-line no-undef
    M.Datepicker.init(elems, { autoClose: true });
  };

  const renderProject = ({ project }) => {
    hideAllInlineFroms();
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
                        <button id="submit" class="right red accent-4 btn waves-effect waves-light" type="submit"
                          name="action">
                          Submit
                        </button>
                        <button class="right   btn-flat  waves-effect waves-light"
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

  const renderAll = ({ projects, project }) => {
    renderProjectsList({ projects });
    renderProject({ project: project || projects[0] });
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
      if (form.offsetParent) {
        form.elements[0].focus();
      }
    });
  };

  const addStaticEventListeners = () => {
    document.getElementById('content').addEventListener('click', (e) => {
      const { target } = e;
      const { path } = e;
      if (
        target.id === 'project-name'
        || target.id === 'add-todo-btn'
        || target.className === 'base'
        || target.className === 'truncate'
        || target.className === 'new red badge'
      ) {
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

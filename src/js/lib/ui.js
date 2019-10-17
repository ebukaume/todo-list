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
        Save
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
    <div class="todos-area">
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
      <li id="add-todo-btn">
        <a class="modal-trigger" href="#create-todo-form-modal">
          Add Todo Item
          <i class="material-icons left red-text">add</i>
        </a>
      </li>
    </ul>
  </div>
  </div>
</main>
  `;
  };

  let createProjectForm;
  let projectsList;
  let projectHeader;
  let projectTodos;

  const renderTodos = ({ todosHash }) => {
    let html = '';
    const todos = Object.keys(todosHash).map((id) => todosHash[id]);
    todos.forEach((todo) => {
      html += `
      <div class="todo-row">
      <tr>
      <td>
      <label>
      <input type="checkbox" />
      <span>${todo.title}</span>
      </label>
      </td>
      </tr>
      <tr class="edit hide">
      <td>
      <label>
      <input type="checkbox" />
      <span>${todo.title}</span>
      </label>
      </td>
      </tr>
      </div>
      `;
    });
    projectTodos.innerHTML = html;
  };

  const renderProject = ({ project }) => {
    const html = `
    <div>
      <h5 id="project-name" class="base" >${project.name}
        <i id="project-delete-btn" data-id="${project.id}" 
          class="material-icons right grey-text">
          delete
        </i>
      </h5>
      
      <div class="edit">
        <input value="${project.name}" id="first_name" 
        type="text" class="validate">
        <button id="submit-project-edit" data-id="${project.id}" name="action"
        class="red accent-4 modal-action btn waves-effect waves-light" type="submit">
          Save
        </button>
      </div>
    </div>
    `;
    projectHeader.innerHTML = html;
    renderTodos({ todosHash: project.todos });
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
    projectHeader = document.getElementById('project-header');
    projectTodos = document.getElementById('project-todos');
  };

  const renderAll = ({ projects, project }) => {
    renderProjectsList({ projects });
    renderProject({ project: project || projects[0] });
  };

  const initialize = ({ projects }) => {
    renderStaticHtml();
    updateDomElements();
    renderAll({ projects });

    return {
      projectsList,
      projectHeader,
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

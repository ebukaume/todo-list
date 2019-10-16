const UI = (() => {
  const CONTENT = document.getElementById('content');

  const header = `
  <nav class="navbar-fixed">
    <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <div class="max-width">
      <a href="#" class="text-off-white">
        <i class="large material-icons">today</i>
        <h1>Todos</h1>
      </a>
    </div>
  </nav>
  `;

  const renderSideNav = () => `
    <main>
    <div class="max-width">
      <ul id="nav-mobile" class="sidenav sidenav-fixed ">
        <li>
          <a href="#!">
            <i class="material-icons">view_module</i>
            Projects
            <i class="material-icons right">add</i>
          </a>
        </li>
        <div class="divider"></div>
        <li class="project-btn"><a href="#!">Default Project</a></li>
        <li id="add-project-btn">
          <a href="#!">Add Project
            <i class="material-icons">add</i>
          </a>
        </li>
      </ul>
    `;

  const initialize = () => {
    CONTENT.innerHTML = `${header}${renderSideNav()}`;
  };

  const getListiners = () => {
    const createProjectForm = document.getElementById('create-project-form');

    return [createProjectForm];
  };

  return {
    initialize,
    getListiners,
  };
})();

export default UI;

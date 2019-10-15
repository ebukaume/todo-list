const Projects = (() => {
  let state = {};

  const getState = () => state;

  const setState = (_projects) => {
    state = _projects;
  };

  const addProject = () => {};

  return {
    setState,
    getState,
    addProject,
  };
})();

export default Projects;

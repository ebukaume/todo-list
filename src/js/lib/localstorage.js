const storage = (() => {
  const defaultKey = 'todo_list_js';
  const store = (projects, key = defaultKey) => {
    localStorage.setItem(key, JSON.stringify(projects));
  };

  const fetch = (key = defaultKey) => {
    let projects = localStorage.getItem(key);
    if (projects) { projects = JSON.parse(projects); }
    return projects;
  };

  return {
    store,
    fetch,
  };
})();

export default storage;

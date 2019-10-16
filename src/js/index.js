import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

// UI.initialize();
app.initialize();

const [createProjectForm, b] = UI.getListiners();

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;
  app.createProject({ name });
});

console.log(app.getDB());

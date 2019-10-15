import UI from './ui.js';
import Seed from './seed.js';
import Projects from './projects.js';
import LocaleStorage from './localstorage.js';


const projects = LocaleStorage.fetch('defaultKey');
if (projects) {
  Projects.setState(projects);
} else {
// During Development Only
  Projects.setState(Seed());
}

console.log(Projects.getState());

UI.initialize();
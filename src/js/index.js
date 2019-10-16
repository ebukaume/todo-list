import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';
import project from './lib/factories/project';
import idGenerator from './lib/util/id_generator';

// UI.initialize();

// Initialize app
app.initialize();

// Create todo
// app.createTodo({
//   title: 'Todo1',
//   projectId: 11983115232,
//   dueDate: Date.now(),
//   priority: 'urgent',
//   desc: 'Important Todo',
// });

// Toggle todo status

app.toggleTodoStatus({ projectId: 11983115232, todoId: 597155594894 });

console.log(app.getDB());

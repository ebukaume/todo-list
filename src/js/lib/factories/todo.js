import { isAfter, formatDistance } from 'date-fns';

const todo = ({
  id, title, desc, dueDate, priority,
}) => ({
  id,
  title,
  desc: desc || 'No Description',
  dueDate,
  priority: priority || '2',
  isDone: false,
  dueDateFormatted() {
    if (dueDate) {
      console.log('duedate: ', dueDate);
      return `Due in ${formatDistance(new Date(dueDate), new Date())}`;
    }
    return '';
  },
  isPassed() {
    return isAfter(new Date(), dueDate);
  },
});

export default todo;

import { isAfter, format } from 'date-fns';

const todo = ({
  id, title, desc, dueDate, priority,
}) => ({
  id,
  title,
  desc: desc || 'No Description',
  dueDate,
  priority: priority || '2',
  isDone: false,
  isPassed() {
    return isAfter(new Date(), dueDate);
  },
  dueDateFormat() {
    return format(dueDate);
  },
});

export default todo;

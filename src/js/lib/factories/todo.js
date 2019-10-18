import { isAfter, formatDistance } from 'date-fns';

const todo = ({
  id,
  title,
  desc = 'No Description',
  dueDate,
  priority = '2',
  isDone = false,
}) => {
  const dueDateFormatted = () => {
    if (dueDate) {
      return `Due in ${formatDistance(new Date(dueDate), new Date())}`;
    }
    return '';
  };

  const isPassed = () => isAfter(new Date(), dueDate);

  return {
    id,
    desc,
    title,
    dueDate,
    isDone,
    priority,
    dueDateFormatted,
    isPassed,
  };
};

export default todo;

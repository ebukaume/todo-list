import { isAfter } from 'date-fns';

const todo = ({
  id,
  title,
  desc = 'No Description',
  dueDate,
  priority = '2',
  isDone = false,
}) => {
  const isPassed = () => isAfter(new Date(), dueDate);

  return {
    id,
    desc,
    title,
    dueDate,
    isDone,
    priority,
    isPassed,
  };
};

export default todo;

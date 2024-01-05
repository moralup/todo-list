import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

function TaskList({ filter, tasks }) {
  return (
    <ul className="todo-list">{
      tasks.map((task) => {
        const { done, name, id, time, date } = task;
        
        if ((filter==='completed'&&!task.done)||
        (filter==='active'&&task.done)) return null;
        
        return (
          <Task key={id} id={id} name={name}
            done={done} time={time} date={date}
          />
        );
      })
    }</ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf),
  filter: PropTypes.string,
};

TaskList.defaultProps = {
  tasks: [],
  filter:'all',
};

export default TaskList;

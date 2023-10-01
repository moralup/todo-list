import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

function TaskFilter(props) {
  const {
    active, completed, onFilterAll, onFilterActive, onFilterCompleted,
  } = props;

  return (
    <ul className="filters">
      <li>
        <button type="submit" onClick={onFilterAll} className={(!completed && !active) ? 'selected' : ''}>All</button>
      </li>
      <li>
        <button type="submit" onClick={onFilterActive} className={active ? 'selected' : ''}>Active</button>
      </li>
      <li>
        <button type="submit" onClick={onFilterCompleted} className={completed ? 'selected' : ''}>Completed</button>
      </li>
    </ul>
  );
}

TaskFilter.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  onFilterActive: PropTypes.func,
  onFilterAll: PropTypes.func,
  onFilterCompleted: PropTypes.func,
};

TaskFilter.defaultProps = {
  completed: false,
  active: false,
  onFilterActive: () => alert('unknown'),
  onFilterAll: () => alert('unknown'),
  onFilterCompleted: () => alert('unknown'),
};

export default TaskFilter;

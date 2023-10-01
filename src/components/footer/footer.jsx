/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../task-filter/task-filter';
import './footer.css';

function Footer(props) {
  const {
    onFilterActive, onFilterCompleted, onFilterAll, active, completed, onClearComponent, num,
  } = props;
  return (
    <footer className="footer">
      <span className="todo-count">
        {num}
        {' '}
        items left
      </span>
      <TaskFilter
        onFilterActive={onFilterActive}
        onFilterCompleted={onFilterCompleted}
        onFilterAll={onFilterAll}
        active={active}
        completed={completed}
      />
      <button type="submit" onClick={onClearComponent} className="clear-completed">Clear completed</button>
    </footer>
  );
}

Footer.propTypes = {
  onFilterActive: PropTypes.func,
  onFilterCompleted: PropTypes.func,
  onFilterAll: PropTypes.func,
  onClearComponent: PropTypes.func,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  num: PropTypes.number,
};

export default Footer;

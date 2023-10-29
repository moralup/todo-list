/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

function TaskList(props) {
  const {
    onToggleCompleted, removeTask, tasks, completed, active, updateTime,
  } = props;
  const taskElems = tasks.map((task) => {
    if (completed && !task.done) return null;
    if (active && task.done) return null;
    return (
      <Task
        onToggleCompleted={onToggleCompleted}
        removeTask={removeTask}
        updateTime={updateTime}
        label={task.label}
        key={task.id}
        id={task.id}
        done={task.done}
        time={task.time}
      />
    );
  });
  // console.log(tasks);
  return (
    <ul className="todo-list">{taskElems}</ul>
  );
}

TaskList.propTypes = {
  onToggleCompleted: PropTypes.func,
  removeTask: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.objectOf),
  completed: PropTypes.bool,
  active: PropTypes.bool,
};

TaskList.defaultProps = {
  onToggleCompleted: () => alert('unknown'),
  removeTask: () => alert('unknown'),
  tasks: [],
  active: false,
  completed: false,
};

export default TaskList;

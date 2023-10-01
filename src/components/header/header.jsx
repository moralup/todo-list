/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../new-task-form/new-task-form';

function Header({ addTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  );
}

Header.propTypes = {
  addTask: PropTypes.func,
};

export default Header;

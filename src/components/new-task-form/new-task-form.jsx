import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  addNewTask = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { addTask } = this.props;
    if (value > -1) return;
    addTask(value);
    this.setState({ value: '' });
  };

  saveNewTask = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.addNewTask}>
        <input
          value={value}
          onChange={this.saveNewTask}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => console.log('xyu'),
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;

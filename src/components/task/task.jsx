import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
// import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
    };
  }

  onLabelClick = (e) => {
    const { removeTask, onToggleCompleted } = this.props;
    switch (e.target.dataset.check) {
      case 'destroy':
        removeTask(e.target.closest('li').id);
        break;
      case 'toggle':
      default:
        onToggleCompleted(e.target.closest('li').id);
    }
  };

  render() {
    const { label, id } = this.props;
    return (
      /* eslint-disable */
      <li
        id={id}
        onClick={this.onLabelClick}
        className={this.props.done ? 'completed' : ''}
      >
        <div className="view">
          <input
            checked={this.props.done}
            readOnly
            data-check="toggle"
            className="toggle"
            type="checkbox"
          />
          <label>
            <span className="description">{label}</span>
            <span className="created">{ formatDistanceToNow(this.state.date)}</span>
          </label>
          <button data-check="edit" className="icon icon-edit" />
          <button data-check="destroy" className="icon icon-destroy" />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  removeTask: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  done: PropTypes.bool,
  id: PropTypes.number,
  label: PropTypes.string,
};

Task.defaultProps = {
  done: false,
};

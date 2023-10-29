/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import pause from '../../images/icon-music/pause.svg';
import start from '../../images/icon-music/start.svg';
import './task.css';
/* eslint no-use-before-define: 0 */
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      timer: false,
      time: '00:00:00',
      indexTimer: null,
    };
  }

  componentDidMount() {
    const { time } = this.props;
    if (time === this.state.time) return;
    this.setState({ time });
  }

  componentWillUnmount() {
    const { indexTimer, time } = this.state;
    if (indexTimer) clearInterval(indexTimer);
    if (time !== this.props.time) {
      this.props.updateTime(this.state.time, this.props.id, true);
    }
  }

  timer = () => {
    const inx = setInterval(() => {
      const { time } = this.state;
      console.log(time);
      const timerArr = time.split(':');
      if (+timerArr[2] < 59) {
        timerArr[2] = +timerArr[2] + 1;
        timerArr[2] = timerArr[2] < 10 ? `0${timerArr[2]}` : timerArr[2];
      } else {
        timerArr[2] = '00';
        timerArr[1] = +timerArr[1] + 1;
        timerArr[1] = timerArr[1] < 10 ? `0${timerArr[1]}` : timerArr[1];
      }
      if (+timerArr[1] >= 59) {
        timerArr[1] = '00';
        timerArr[0] = +timerArr[0] + 1;
        timerArr[0] = timerArr[0] < 10 ? `0${timerArr[0]}` : timerArr[0];
      }
      // eslint-disable-next-line no-confusing-arrow
      const newTime = timerArr.join(':');
      this.setState({ time: newTime });
    }, 1000);
    this.setState({ indexTimer: inx });
  };

  toggleTimer = (e) => {
    e.stopPropagation();
    this.setState((state) => {
      if (state.indexTimer) clearInterval(state.indexTimer);
      if (!state.timer) this.timer();
      return { timer: !state.timer };
    });
  };

  onClickCompleted = (e) => {
    const { onToggleCompleted } = this.props;
    onToggleCompleted(e.target.closest('li').id);
  };

  onClickRemoveTask = (e) => {
    e.stopPropagation();
    const { removeTask } = this.props;
    removeTask(e.target.closest('li').id);
  };

  render() {
    const { label, id } = this.props;
    return (
      /* eslint-disable */
      <li
        id={id}
        onClick={this.onClickCompleted}
        className={this.props.done ? 'completed' : ''}
      >
        <div className="view">
            <span className="description">{label}</span>
            <span onClick={this.toggleTimer} className="timer">
              <button>{this.state.timer ? 
                <img className="timer-icon" src={pause} alt="pause"/> : 
                <img className="timer-icon" src={start} alt="start"/>}
              </button>
            <div className="timer-time">{this.state.time}</div>
            </span>
            <span className="created">{formatDistanceToNow(this.state.date)}</span>
          <button className="icon icon-edit" />
          <button onClick={this.onClickRemoveTask} className="icon icon-destroy" />
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

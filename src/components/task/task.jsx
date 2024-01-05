import { useState, useEffect, useContext, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Context } from '../context';
import pause from '../../images/pause.svg';
import start from '../../images/start.svg';
import './task.css';

function Task({ name, id, date, time: propTime, done }){
  const { toggleDone, removeTask, updateTime } = useContext(Context);
  const [ isTimerRunning, setIsTimerRunning ] = useState(false);
  const [ time, setTime ] = useState(propTime);
  const timeRef  = useRef(time);
  
  useEffect(() => {
    if(!isTimerRunning) return;
    
    const idxTimer = setInterval(() => {
      setTime(time => timer(time));
    }, 1000);
    
    return () => {
      clearInterval(idxTimer);
    };
  },[isTimerRunning]);

  useEffect(() => {
    timeRef.current = time;
  },[time]);

  useEffect(() => {
    return () => {
      if(time!==timeRef.current) updateTime(timeRef.current, id);
    };
  },[]);

  const timer = (() => {
    const updateTime = (arr, i, infinity) => {
      if(arr[i]<59||infinity) return arr[i] < 9 ? `0${Number(arr[i])+1}` : Number(arr[i])+1;
      return '00';
    }; 
    
    return (oldTime) =>{
      const arr = oldTime.split(':');
      arr[2] = updateTime(arr, 2); //! seconds
      arr[1] = Number(updateTime[2])===0? updateTime(arr, 1) : arr[1]; //! minutes
      arr[0] = Number(updateTime[1])===0&&+Number(arr[2])===0? updateTime(arr,0, true) : arr[0]; //! hours
      return arr.join(':');
    };
  })();

  const handleClickToggleTimer = e => {
    e.stopPropagation();
    setIsTimerRunning(t => !t);
  };

  const handleClickRemoveTask = e => {
    e.stopPropagation();
    removeTask(Number(e.target.closest('li').id));
  };

  const handleClickToggleDone = e => {
    toggleDone(Number(e.target.closest('li').id));
  };

  return (
    <li id={id}
      className={done ? 'completed' : ''}  
      onClick={handleClickToggleDone}>
      <div className="view">
        <span className="description">{name}</span>
        <span className="timer">
          <button onClick={handleClickToggleTimer}>
            <img className="timer-icon"
              src={isTimerRunning? pause:start} 
              alt={isTimerRunning? 'pause':'start'}/>
          </button>
          <div className="timer-time">{time}</div>
        </span>
        <span className="age">{formatDistanceToNow(date)}</span>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={handleClickRemoveTask} />
      </div>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  done: PropTypes.bool,
  time: PropTypes.string,
};

Task.defaultProps = {
  done: false,
  time: '00:00:00',
};

export default Task;

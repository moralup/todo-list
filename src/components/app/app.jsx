import { useState } from 'react';
import { Provider } from '../context';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import './app.css';

export default () => {  
  const [ tasks, setTasks ] = useState([]);
  const [ id, setId ] = useState(0);
  const [ filter, setFilter ] = useState('all');
  
  const addTask = (name) => {
    setTasks(ts => [...ts, {
      name, 
      id,
      done: false,
      time: '00:00:00',
      date: Date.now(),
    }]);
    setId(i => ++i);
  };

  const updateTasks = (tasks, id, target, time) => {
    const idx = tasks.findIndex(ts => ts.id === id);
    let updatableTask = [];  
    
    switch(true){
    case !tasks[idx]:
      return tasks;
    case target==='time':
      updatableTask = [{ ...tasks[idx], time }]; 
      break;
    case target==='done':
      updatableTask = [{ ...tasks[idx], done: !tasks[idx].done }];     
      break;
    }     
    
    return [...tasks.slice(0, idx), ...updatableTask, ...tasks.slice(idx+1)];
  };

  const toggleDone = (id) => {
    setTasks(tasks => updateTasks(tasks, id, 'done'));
  };
  
  const updateTime = (time, id) => {
    setTasks(task => updateTasks(task, id, 'time', time));
  };
  
  const removeTask = (id) => {
    setTasks(tasks => updateTasks(tasks, id));
  };

  const removeCompletedTask = () => {
    setTasks(tasks => tasks.filter(task => !task.done));
  };

  return (
    <>
      <Provider value={addTask}>
        <Header/>
      </Provider>
      <Provider value={{ toggleDone, removeTask, updateTime }}>
        <TaskList
          tasks={tasks}
          filter={filter}
        />
      </Provider>
      <Provider value={{ filter, setFilter }}>
        <Footer
          numOfActiveTasks={tasks.filter((task) => !task.done).length}
          filter={filter}
          setFilter={setFilter}
          removeCompletedTask={removeCompletedTask}
        />
      </Provider>
    </>
  );
};

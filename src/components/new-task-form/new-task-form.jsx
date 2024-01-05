import { useState, useContext } from 'react';
import { Context } from '../context';
import './new-task-form.css';

function NewTaskForm(props) {
  const [value, setValue] = useState('');
  const addTask = useContext(Context);
  
  const addNewTask = (e) => {
    e.preventDefault();
    if(value>-1) return;
    addTask(value);
    setValue('');
  };

  const saveNewTask = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <form onSubmit={addNewTask}>
      <input
        value={value}
        onChange={saveNewTask}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
}

export default NewTaskForm;

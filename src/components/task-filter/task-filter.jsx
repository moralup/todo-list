import { useContext } from 'react';
import { Context } from '../context';
import './task-filter.css';

function TaskFilter() {
  const { filter, setFilter } = useContext(Context);
  
  const handleClick = e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    setFilter(btn.id);
  };
  
  return (
    <ul className="filters" onClick={handleClick}>{
      ['all', 'active', 'completed'].map(el => {
        return (
          <li key={el}>
            <button id={el}
              className={filter===el? 'selected':''}>{el}
            </button>
          </li>
        );
      })
    }</ul>
  );
}

export default TaskFilter;

import PropTypes from 'prop-types';
import TaskFilter from '../task-filter';
import './footer.css';

function Footer({ removeCompletedTask, numOfActiveTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${numOfActiveTasks} tasks left`}
      </span>
      <TaskFilter />
      <button 
        onClick={removeCompletedTask}
        className="clear-completed">
          clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  removeCompletedTask: PropTypes.func,
  numOfActiveTasks: PropTypes.number,
};
Footer.defaultProps = {
  removeCompletedTask: () => {},
  numOfActiveTasks: '?',
};
export default Footer;

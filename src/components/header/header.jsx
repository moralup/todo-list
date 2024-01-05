import NewTaskForm from '../new-task-form';

function Header() {
  return (
    <header className="header">
      <h1>TodoList</h1>
      <NewTaskForm />
    </header>
  );
}

export default Header;

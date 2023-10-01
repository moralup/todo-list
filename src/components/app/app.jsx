import React, { Component } from 'react';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [],
      count: 0,
      active: false,
      completed: false,
    };
  }

  addTask = (task) => {
    this.setState((state) => ({
      todoData: [
        ...state.todoData,
        { label: task, id: state.count, done: false },
      ],
      count: +state.count + 1,
    }));
  };

  removeTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => +el.id === +id);
      const newTaskList = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newTaskList };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => +el.id === +id);
      const newTaskList = [
        ...todoData.slice(0, idx),
        { ...todoData[idx], done: !todoData[idx].done },
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newTaskList };
    });
  };

  onFilterCompleted = () => {
    this.setState({ completed: true, active: false });
  };

  onFilterActive = () => {
    this.setState({ active: true, completed: false });
  };

  onFilterAll = () => {
    this.setState({ active: false, completed: false });
  };

  onClearComponent = () => {
    this.setState(({ todoData }) => {
      const activeTaskList = todoData.filter((task) => !task.done);
      return { todoData: activeTaskList };
    });
  };

  render() {
    const { todoData, completed, active } = this.state;
    return (
      <div>
        <Header addTask={this.addTask} />
        <TaskList
          onToggleCompleted={this.onToggleCompleted}
          removeTask={this.removeTask}
          tasks={todoData}
          completed={completed}
          active={active}
        />
        <Footer
          num={todoData.filter((task) => !task.done).length}
          onFilterActive={this.onFilterActive}
          onFilterCompleted={this.onFilterCompleted}
          onFilterAll={this.onFilterAll}
          onClearComponent={this.onClearComponent}
          active={active}
          completed={completed}
        />
      </div>
    );
  }
}

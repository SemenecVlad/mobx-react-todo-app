import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TodoItem from './components/TodoItem';
import TodosCheckAll from './components/TodosCheckAll';
import TodosRemaining from './components/TodosRemaining';
import TodosFiltered from './components/TodosFiltered';
import TodosClearCompleted from './components/TodosClearCompleted';

import { inject ,observer } from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {

  render() {
    const TodoStore = this.props.TodoStore;
    
    return (
      <div className="App">
        <header className="App-header">
          <span>MobX Todo App</span>
        </header>

        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done"
            ref={TodoStore.todoInput}
            onKeyUp={TodoStore.addTodo}
          />

          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
          {TodoStore.todosFiltered.map((todo) => 
            <TodoItem
              key={todo.id}
              todo={todo}
              // index={index}
            />
          )}
          </ReactCSSTransitionGroup>

          <div className="extra-container">
            <TodosCheckAll />
            <TodosRemaining />
          </div>

          <div className="extra-container">
            <TodosFiltered />

            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {TodoStore.todosCompletedCount > 0 &&
                <TodosClearCompleted />
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>          

      </div>
    );
  }
}

export default App;

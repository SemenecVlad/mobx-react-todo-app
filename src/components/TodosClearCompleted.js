import React from 'react';
import { inject, observer } from 'mobx-react';

const TodosClearCompleted = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div>
            <button className="clear-completed-btn" onClick={TodoStore.clearCompleted}>Clear Completed</button>
        </div>
    )
}));

export default TodosClearCompleted;
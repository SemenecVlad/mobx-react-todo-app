import React from 'react';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';

const TodosFiltered = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div>
            <button
                onClick={() => TodoStore.updateFilter('all')}
                className={classnames({'active': TodoStore.filter === 'all'})}
            >
                All
            </button>

            <button
                onClick={() => TodoStore.updateFilter('active')}
                className={classnames({'active': TodoStore.filter === 'active'})}
            >
                Active
            </button>

            <button
                onClick={() => TodoStore.updateFilter('completed')}
                className={classnames({'active': TodoStore.filter === 'completed'})}
            >
                Completed
            </button>
        </div>
    )
}));

export default TodosFiltered;

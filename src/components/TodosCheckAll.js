import React from 'react';
import { inject, observer } from 'mobx-react';

const TodosCheckAll = inject('TodoStore')(observer((props) => {
    const TodoStore = props.TodoStore;
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={!TodoStore.anyRemaining}
                    onChange={TodoStore.checkAllTodos}
                />
                Check All
            </label>
        </div>
    )
}));

export default TodosCheckAll;
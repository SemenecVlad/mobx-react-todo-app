import React from 'react';
import { inject, observer } from 'mobx-react';

const TodosRemaining = inject('TodoStore')(observer((props) => {
    return (
        <div>
            {props.TodoStore.remaining} items left
        </div>
    )
}));

export default TodosRemaining;
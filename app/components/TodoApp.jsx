import React from 'react';
import TodoForm from './TodoForm.jsx';
import FilteredTodoList from './FilteredTodoList.jsx';
import todosStore from '../stores/todosStore';

export default React.createClass({
    componentDidMount() {
        // Fetch tasks from local storage
        todosStore.fetch({
            success() {
                // Initialize children views
                todosStore.start();
            }
        });

    },

    render() {
        return (
            <div className="columns">
                <TodoForm />
                <FilteredTodoList pageSize={5}/>
            </div>
        );
    }
});

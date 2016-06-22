import React from 'react';
import TodoForm from './TodoForm.jsx';
import FilteredTodoList from './FilteredTodoList.jsx';
import todoStore from '../stores/TodoStore';

class TodoApp extends React.Component {
	  componentDidMount() {
		    // Fetch tasks from local storage
        todoStore.fetch({
            success() {
                // Initialize children views
                todoStore.publish();
            }
        });
	  }

	  render() {
        return (
            <div className="columns">
                <TodoForm />
                <FilteredTodoList pageSize={5}/>
            </div>
        );
    }
}

export default TodoApp;

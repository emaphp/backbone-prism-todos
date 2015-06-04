var React = require('react');
var TodoForm = require('./TodoForm.jsx');
var FilteredTodoList = require('./FilteredTodoList.jsx');
var todosStore = require('../stores/todosStore');

var TodoApp = React.createClass({
    componentDidMount: function () {
        // Fetch tasks from local storage
        todosStore.fetch({
            success: function () {
                // Initialize children views
                todosStore.start();
            }
        });
    },

    render: function () {
        return (
            <div className="columns">
                <TodoForm />
                <FilteredTodoList pageSize={5}/>
            </div>
        );
    }
});

module.exports = TodoApp;

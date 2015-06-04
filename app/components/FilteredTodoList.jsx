var React = require('react');
var SearchBar = require('./SearchBar.jsx');
var TodoList = require('./TodoList.jsx');
var StatusBar = require('./StatusBar.jsx');
var PaginationBar = require('./PaginationBar.jsx');
var OrderBar = require('./OrderBar.jsx');
var todosStore = require('../stores/todosStore');

var FilteredTodoList = React.createClass({
    getInitialState: function () {
        return {
            // Default view
            defaultView: todosStore.getDefaultView(),

            // Main view
            mainView: todosStore.createView({
                name: 'main'
            })
        };
    },

    render: function () {
        return (
            <div className="two-thirds column">
                <StatusBar view={this.state.defaultView} mainView={this.state.mainView} />
                <SearchBar view={this.state.mainView} />
                <TodoList view={this.state.mainView} />
                <PaginationBar view={this.state.mainView} pageSize={this.props.pageSize} />
                <OrderBar view={this.state.mainView} />
            </div>
        );
    }
});

module.exports = FilteredTodoList;

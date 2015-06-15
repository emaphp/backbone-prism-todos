import React from 'react';
import Prism from 'backbone.prism';
import SearchBar from './SearchBar.jsx';
import TodoList from './TodoList.jsx';
import StatusBar from './StatusBar.jsx';
import PaginationBar from './PaginationBar.jsx';
import OrderBar from './OrderBar.jsx';
import todosStore from '../stores/todosStore';

export default React.createClass({
    getDefaultProps() {
        return {
            channel: new Prism.Channel()
        };
    },

    getInitialState() {
        return {
            // Default view
            defaultView: todosStore.getDefaultView(),

            // Main view
            mainView: todosStore.createView({
                name: 'main'
            })
        };
    },

    componentWillUnmount() {
        this.props.channel.destroy();
    },

    render() {
        return (
            <div className="two-thirds column">
                <StatusBar view={this.state.defaultView} mainView={this.state.mainView} channel={this.props.channel} />
                <SearchBar view={this.state.mainView} channel={this.props.channel}/>
                <TodoList view={this.state.mainView} />
                <PaginationBar view={this.state.mainView} pageSize={this.props.pageSize} channel={this.props.channel}/>
                <OrderBar view={this.state.mainView} />
            </div>
        );
    }
});

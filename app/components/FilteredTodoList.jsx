import React from 'react';
import {Channel} from 'backbone.prism';
import SearchBar from './SearchBar.jsx';
import TodoList from './TodoList.jsx';
import StatusBar from './StatusBar.jsx';
import PaginationBar from './PaginationBar.jsx';
import OrderBar from './OrderBar.jsx';
import todoStore from '../stores/TodoStore';

class FilteredTodoList extends React.Component {
	componentWillMount() {
		//Views
		this.filterView = todoStore.createView({
			name: 'filter'
		});
		
		this.statusView = this.filterView.createView({
			name: 'status',
			listenTo: 'sync'
		});
		
		this.paginatorView = this.statusView.createView({
			name: 'paginator',
			listenTo: 'sync'
		});
		
		//Channel
		this.channel = new Channel();
	}
	
	componentWillUnmount() {
        this.channel.destroy();
    }
    
    render() {
        return (
            <div className="two-thirds column">
                <StatusBar view={this.filterView} target={this.statusView} channel={this.channel} />
                <SearchBar target={this.filterView} channel={this.channel}/>
                <TodoList view={this.paginatorView} channel={this.channel}/>
                <PaginationBar view={this.statusView} target={this.paginatorView} pageSize={this.props.pageSize} channel={this.channel}/>
                <OrderBar target={this.filterView} />
            </div>
        );
    }
}

export default FilteredTodoList;

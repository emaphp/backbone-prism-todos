import React from 'react';
import Prism from '../backbone.prism';
import SearchBar from './SearchBar.jsx';
import TodoList from './TodoList.jsx';
import StatusBar from './StatusBar.jsx';
import PaginationBar from './PaginationBar.jsx';
import OrderBar from './OrderBar.jsx';
import todoStore from '../stores/TodoStore';

class FilteredTodoList extends React.Component {
    componentWillMount() {
        // Views
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

		    // Channel
		    this.channel = new Prism.Channel();
	  }

	  componentWillUnmount() {
        this.channel.destroy();
    }

    render() {
        return (
            <div className="two-thirds column">
                <StatusBar view={this.filterView} statusOn={this.statusView} channel={this.channel} />
                <SearchBar filterOn={this.filterView} channel={this.channel}/>
                <TodoList view={this.paginatorView} />
                <PaginationBar view={this.statusView} paginateOn={this.paginatorView} pageSize={this.props.pageSize} channel={this.channel}/>
                <OrderBar orderOn={this.filterView} />
            </div>
        );
    }
}

export default FilteredTodoList;

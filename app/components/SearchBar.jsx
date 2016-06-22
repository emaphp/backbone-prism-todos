import React from 'react';
import _ from 'underscore';

class SearchBar extends React.Component {
	  constructor(props) {
		    super(props)

		    this.state = {
			      filter: ''
		    };

        this.handleInputSearch = this.handleInputSearch.bind(this);
        this.handleInputClear = this.handleInputClear.bind(this);
	  }

	  componentWillMount() {
        let channel = this.props.channel;

        this.filter = this.props.filterOn.createFilter(this, () => {
            let filter = this.state.filter;
            let regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');
            return model => filter === '' ? true : model.get('description').match(regex);
        });

        // Reduce overhead by composing a callback function with debounce
        let filterCallback = () => {
            channel.trigger('page:reset');
            this.filter.apply();
        };

        this.inputCallback = _.debounce(filterCallback.bind(this), 200);
	  }

	  handleInputSearch(e) {
        let filter = e.target.value;
        this.setState({filter}, this.inputCallback);
    }

    handleInputClear(e) {
        e.preventDefault();
        this.props.channel.trigger('page:reset');
        this.setState({filter: ''}, this.filter.eval());
    }

    componentWillUnmount() {
        this.filter.destroy();
    }

    render() {
        return (
            <div className="flex-table search-bar">
                <div className="flex-table-item flex-table-item-primary">
                    <input className="input-block" type="text" placeholder="Filter tasks by description" value={this.state.filter} onChange={this.handleInputSearch} ref="filter"/>
                </div>
                <div className="flex-table-item">
                    <form onSubmit={this.handleInputClear}>
                        <button className="btn" type="submit"><span className="octicon octicon-x"></span></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;

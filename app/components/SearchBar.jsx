import React from 'react';
import _ from 'underscore';

class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			filter: ''
		};
	}
	
	componentWillMount() {
		let view = this.props.target;
        let channel = this.props.channel;

        this.filter = view.createFilter(() => {
            let filter = this.state.filter;
            let regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');
            return model => filter === '' ? true : model.get('description').match(regex);
        }, this);
        
        //Reduce overhead by composing a callback function with debounce
        this.inputCallback = _.debounce(_.bind(() => {
            // Reset pagination component
            channel.trigger('page:reset');
            this.filter.apply();
        }, this), 200);
	}
	
	handleInputSearch(e) {
        let filter = $(e.target).val();
        this.setState({filter}, this.inputCallback);
    }

    handleInputClear(e) {
        e.preventDefault();
        this.props.channel.trigger('page:reset');
        this.filter.update({filter: ''});
    }

    componentWillUnmount() {
        this.filter.destroy();
    }
    
    render() {
        return (
            <div className="flex-table search-bar">
                <div className="flex-table-item flex-table-item-primary">
                    <input className="input-block" type="text" placeholder="Filter tasks by description" value={this.state.filter} onChange={_.bind(this.handleInputSearch, this)} ref="filter"/>
                </div>
                <div className="flex-table-item">
                    <form onSubmit={_.bind(this.handleInputClear, this)}>
                        <button className="btn" type="submit"><span className="octicon octicon-x"></span></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;

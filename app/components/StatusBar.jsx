import React from 'react';
import Prism from 'backbone.prism';
import _ from 'underscore';
import StatusOption from './StatusOption.jsx';

class StatusBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selected: 'all'
		};
	}
	
	transform(view) {
		return {
			all: view.length,
			active: view.filter(model => !model.get('closed')).length,
			closed: view.filter(model => model.get('closed')).length
		};
	}
	
	componentWillMount() {
		let view = this.props.target;

        this.filter = view.createFilter(() => {
            let filter = this.state.selected;

            return model => {
                switch (filter) {
                    case 'all': return true;
                    case 'active': return !model.get('closed');
                    case 'closed': return model.get('closed');
                }
            };
        }, this);
        
        this.filterCallback = _.bind(() => this.filter.apply(), this);
        this.props.channel.reply('status:current', _.bind(() => this.state.selected, this));
	}
	
	componentWillUnmount() {
        this.filter.destroy();
    }
    
	handleChangeSelected(selected) {
		// Reset paginator component
        this.props.channel.trigger('page:reset');

        // Change current state and then apply the filter mutator
        this.setState({selected}, this.filterCallback);
	}
	
	render() {
		if (!this.props.view.isInitialized()) {
			return (<div className="status-bar"></div>);
		}
		
		let values = this.props.values();
		
        return (
            <div className="status-bar">
                <StatusOption key='all' name="All" option="all" handler={_.bind(this.handleChangeSelected, this)} selected={this.state.selected} total={values.all}/>
                <StatusOption key='active' name="Active" option="active" handler={_.bind(this.handleChangeSelected, this)} selected={this.state.selected} total={values.active}/>
                <StatusOption key='closed' name="Closed" option="closed" handler={_.bind(this.handleChangeSelected, this)} selected={this.state.selected} total={values.closed}/>
            </div>
        );
    }
}

export default Prism.compose(React, StatusBar);

import React from 'react';
import Prism from '../backbone.prism';
import StatusOption from './StatusOption.jsx';

class StatusBar extends React.Component {
	  constructor(props) {
	      super(props);

		    this.state = {
			      selected: 'all'
		    };

        this.handleChangeSelected = this.handleChangeSelected.bind(this);
	  }

	  viewTransform(view) {
		    return {
			      all: view.length,
			      active: view.filter(model => !model.get('closed')).length,
			      closed: view.filter(model => model.get('closed')).length
		    };
	  }

	  componentWillMount() {
        this.filter = this.props.statusOn.createFilter(this, () => {
            let filter = this.state.selected;

            return model => {
                switch (filter) {
                    case 'all': return true;
                    case 'active': return !model.get('closed');
                    case 'closed': return model.get('closed');
                }
            };
        });

        this.props.channel.reply('status:current', () => this.state.selected, this);
	  }

	  componentWillUnmount() {
        this.filter.destroy();
    }

	  handleChangeSelected(selected) {
		    // Reset paginator component
        this.props.channel.trigger('page:reset');

        // Change current state and then apply the filter mutator
        this.setState({selected}, this.filter.eval());
	  }

	  render() {
		    if (!this.props.view.isInitialized()) {
			      return (<div className="status-bar"></div>);
		    }

        return (
            <div className="status-bar">
                <StatusOption key='all' name="All" option="all" handler={this.handleChangeSelected} selected={this.state.selected} total={this.props.$value('all')}/>
                <StatusOption key='active' name="Active" option="active" handler={this.handleChangeSelected} selected={this.state.selected} total={this.props.$value('active')}/>
                <StatusOption key='closed' name="Closed" option="closed" handler={this.handleChangeSelected} selected={this.state.selected} total={this.props.$value('closed')}/>
            </div>
        );
    }
}

export default Prism.compose(StatusBar, ['view']);

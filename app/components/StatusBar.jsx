import React from 'react';
import Prism from 'backbone.prism';
import StatusOption from './StatusOption.jsx';

export default React.createClass({
    mixins: [Prism.ViewMixin],

    getInitialState() {
        return {
            selected: 'all'
        };
    },

    // Generates a custom state from the default view
    transform(view) {
        return {
            all: view.length,
            active: view.filter(function (model) {
                return !model.get('closed');
            }).length,
            closed: view.filter(function (model) {
                return model.get('closed');
            }).length
        };
    },

    componentDidMount() {
        let view = this.props.mainView;

        this.filter = view.createFilter(function () {
            var filter = this.state.selected;

            return function (model) {
                switch (filter) {
                    case 'all': return true;
                    case 'active': return !model.get('closed');
                    case 'closed': return model.get('closed');
                }
            };
        }, this);
    },

    changeSelected(selected) {
        // Reset paginator component
        this.props.channel.command('page:reset');

        // Change current state and then apply the filter mutator
        // All components listening to mainView will then re-render
        this.setState({selected}, this.filter.update());
    },

    componentWillUnmount() {
        this.filter.destroy();
    },

    render() {
        return (
            <div className="status-bar">
                <StatusOption key='all' name="All" option="all" handler={this.changeSelected} selected={this.state.selected} total={this.state.all}/>
                <StatusOption key='active' name="Active" option="active" handler={this.changeSelected} selected={this.state.selected} total={this.state.active}/>
                <StatusOption key='closed' name="Closed" option="closed" handler={this.changeSelected} selected={this.state.selected} total={this.state.closed}/>
            </div>
        );
    }
});

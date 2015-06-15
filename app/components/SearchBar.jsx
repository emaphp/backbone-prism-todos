import React from 'react';
import _ from 'underscore';

export default React.createClass({
    getInitialState() {
        return {
            filter: ''
        };
    },

    componentDidMount() {
        let view = this.props.view;
        let channel = this.props.channel;

        this.filter = view.createFilter(() => {
            let filter = this.state.filter;
            let regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');

            return model => {
                if (filter === '') {
                    return true;
                }
                return model.get('description').match(regex);
            };
        }, this);

        // reduce overhead by composing a callback function with debounce
        this.inputCallback = _.debounce((() => {
            // Reset pagination component
            channel.command('page:reset');
            this.filter.apply();
        }).bind(this), 200);
    },

    handleInputSearch(e) {
        let filter = $(e.target).val();
        this.setState({filter}, this.inputCallback);
    },

    handleInputClear(e) {
        e.preventDefault();
        this.props.channel.command('page:reset');
        this.setState({filter: ''}, this.filter.update());
    },

    componentWillUnmount() {
        this.filter.destroy();
    },

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
});

var React = require('react');
var _ = require('underscore');

var SearchBar = React.createClass({
    getInitialState: function () {
        return {
            filter: ''
        };
    },

    componentDidMount: function () {
        var view = this.props.view;

        this.filter = view.createFilter(function () {
            var filter = this.state.filter;
            var regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');

            return function (model) {
                if (filter === '') {
                    return true;
                }
                return model.get('description').match(regex);
            };
        }, this);

        // reduce overhead by composing a callback function with debounce
        this.inputCallback = _.debounce((function () {
            // Reset pagination component
            view.command('page:reset');
            this.filter.apply();
        }).bind(this), 200);
    },

    handleInputSearch: function (e) {
        var value = $(e.target).val();
        this.setState({filter: value}, this.inputCallback);
    },

    handleInputClear: function (e) {
        e.preventDefault();
        this.props.view.command('page:reset');
        this.setState({filter: ''}, this.filter.update());
    },

    componentWillUnmount: function () {
        this.filter.destroy();
    },

    render: function () {
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

module.exports = SearchBar;

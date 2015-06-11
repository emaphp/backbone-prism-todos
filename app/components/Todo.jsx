var React = require('react');
var TodosActions = require('../mixins/TodosActions');

var Todo = React.createClass({
    mixins: [TodosActions],

    cssClasses: ['low', 'normal', 'high', 'very-high'], // CSS classes

    priorities: ['Low', 'Normal', 'High', 'Very High'], // Priorities names

    getPriorityClass: function () {
        return this.cssClasses[this.props.model.priority - 1];
    },

    getPriorityName: function () {
        return this.priorities[this.props.model.priority - 1];
    },

    getStatusClass: function () {
        return this.props.model.closed ? 'state-closed' : 'state-open';
    },

    getStatusName: function () {
        return this.props.model.closed ? 'Closed' : 'Active';
    },

    //
    // Handlers
    //

    handleSwitchStatus: function (e) {
        e.preventDefault();
        return this.doSwitchStatus(this.props.model.id);
    },

    handleRemoveItem: function (e) {
        e.preventDefault();
        this.doRemoveItem(this.props.model.id);
    },

    //
    // Render
    //

    render: function () {
        var inlineStyles = {
            'textDecoration': this.props.model.closed ? 'line-through' : 'none'
        };

        return (
            <div className="task-box clearfix">
                <a style={inlineStyles} className="left" href="#" onClick={this.handleSwitchStatus}>{this.props.model.description}<span className={'counter ' + this.getPriorityClass()}>{this.getPriorityName()}</span></a>
                <form onSubmit={this.handleRemoveItem}>
                    <button className="btn btn-sm right" type="submit"><span className="octicon octicon-trashcan"></span></button>
                </form>
                <span className={'state right ' + this.getStatusClass()}>{this.getStatusName()}</span>
            </div>
        );
    }
});

module.exports = Todo;

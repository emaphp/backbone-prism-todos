import React from 'react';
import TodosActions from '../mixins/TodosActions';

export default React.createClass({
    mixins: [TodosActions],

    cssClasses: ['low', 'normal', 'high', 'very-high'], // CSS classes

    priorities: ['Low', 'Normal', 'High', 'Very High'], // Priorities names

    getPriorityClass() {
        return this.cssClasses[this.props.model.priority - 1];
    },

    getPriorityName() {
        return this.priorities[this.props.model.priority - 1];
    },

    getStatusClass() {
        return this.props.model.closed ? 'state-closed' : 'state-open';
    },

    getStatusName() {
        return this.props.model.closed ? 'Closed' : 'Active';
    },

    //
    // Handlers
    //

    handleSwitchStatus(e) {
        e.preventDefault();
        return this.doSwitchStatus(this.props.model.id);
    },

    handleRemoveItem(e) {
        e.preventDefault();
        this.doRemoveItem(this.props.model.id);
    },

    //
    // Render
    //

    render: function () {
        let inlineStyles = {
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

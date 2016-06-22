import React from 'react';
import TodoActions from '../actions/TodoActions';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwitchStatus = this.handleSwitchStatus.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

	  static getCssClasses() {
		    return ['low', 'normal', 'high', 'very-high'];
	  }

	  static getPriorities() {
		    return ['Low', 'Normal', 'High', 'Very High'];
	  }

	  getPriorityClass() {
        return Todo.getCssClasses()[this.props.model.get('priority') - 1];
    }

    getPriorityName() {
        return Todo.getPriorities()[this.props.model.get('priority') - 1];
    }

    getStatusClass() {
        return this.props.model.get('closed') ? 'state-closed' : 'state-open';
    }

    getStatusName() {
        return this.props.model.get('closed') ? 'Closed' : 'Active';
    }

    handleSwitchStatus(e) {
        e.preventDefault();
        TodoActions.switchStatus(this.props.model.get('id'));
    }

    handleRemoveItem(e) {
        e.preventDefault();
        TodoActions.removeItem(this.props.model.get('id'));
    }

    render() {
        let inlineStyles = {
            'textDecoration': this.props.model.get('closed') ? 'line-through' : 'none'
        };

        return (
            <div className="task-box clearfix">
                <a style={inlineStyles} className="left" href="#" onClick={this.handleSwitchStatus}>{this.props.model.get('description')}<span className={'counter ' + this.getPriorityClass()}>{this.getPriorityName()}</span></a>
                <form onSubmit={this.handleRemoveItem}>
                    <button className="btn btn-sm right" type="submit"><span className="octicon octicon-trashcan"></span></button>
                </form>
                <span className={'state right ' + this.getStatusClass()}>{this.getStatusName()}</span>
            </div>
        );
    }
}

export default Todo;

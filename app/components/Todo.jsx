import React from 'react';
import TodoActions from '../actions/TodoActions';
import _ from 'underscore';

class Todo extends React.Component {
	static getCssClasses() {
		return ['low', 'normal', 'high', 'very-high'];
	}
	
	static getPriorities() {
		return ['Low', 'Normal', 'High', 'Very High'];
	}
	
	getPriorityClass() {
        return Todo.getCssClasses()[this.props.model.priority - 1];
    }
    
    getPriorityName() {
        return Todo.getPriorities()[this.props.model.priority - 1];
    }
    
    getStatusClass() {
        return this.props.model.closed ? 'state-closed' : 'state-open';
    }
    
    getStatusName() {
        return this.props.model.closed ? 'Closed' : 'Active';
    }
    
    handleSwitchStatus(e) {
        e.preventDefault();
        this.props.channel.trigger('page:reduce', false);
        TodoActions.switchStatus(this.props.model.id);
    }
    
    handleRemoveItem(e) {
        e.preventDefault();
        this.props.channel.trigger('page:reduce', true);
        TodoActions.removeItem(this.props.model.id);
    }
    
    render() {
        let inlineStyles = {
            'textDecoration': this.props.model.closed ? 'line-through' : 'none'
        };

        return (
            <div className="task-box clearfix">
                <a style={inlineStyles} className="left" href="#" onClick={_.bind(this.handleSwitchStatus, this)}>{this.props.model.description}<span className={'counter ' + this.getPriorityClass()}>{this.getPriorityName()}</span></a>
                <form onSubmit={_.bind(this.handleRemoveItem, this)}>
                    <button className="btn btn-sm right" type="submit"><span className="octicon octicon-trashcan"></span></button>
                </form>
                <span className={'state right ' + this.getStatusClass()}>{this.getStatusName()}</span>
            </div>
        );
    }
}

export default Todo;

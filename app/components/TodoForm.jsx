import React from 'react';
import TodoActions from '../actions/TodoActions';
import _ from 'underscore';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			description: '',
			priority: 1
		};
	}
	
	handleInputDescription(e) {
        let value = $(e.target).val();
        this.setState({
            description: value
        });
    }
    
    handleSelectPriority(e) {
        let value = $(e.target).val();
        this.setState({
            priority: value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.description) {
            return;
        }

        let item = {
            description: this.state.description,
            priority: this.state.priority,
            created_at: (new Date()).getTime(),
            closed: false
        };

        TodoActions.addItem(item);
        this.setState({
			description: '',
			priority: 1
		});
    }
    
    render() {
        return (
            <div className="one-third column">
                <h2 className="form-title">New Task</h2>
                <form onSubmit={_.bind(this.handleSubmit, this)}>
                    <dl className="form">
                        <dt><label>Description</label></dt>
                        <dd><input type="text" className="textfield" placeholder="Task Description" value={this.state.description} onChange={_.bind(this.handleInputDescription, this)}/></dd>
                    </dl>
                    <dl className="form">
                        <dt><label>Priority</label></dt>
                        <dd>
                            <select value={this.state.priority} onChange={_.bind(this.handleSelectPriority, this)}>
                                <option value="1">Low</option>
                                <option value="2">Normal</option>
                                <option value="3">High</option>
                                <option value="4">Very High</option>
                            </select>
                        </dd>
                    </dl>
                    <dl className="form">
                        <dd>
                            <button className="btn btn-primary" type="submit">Add task</button>
                        </dd>
                    </dl>
                </form>
            </div>
        );
    }
}

export default TodoForm;

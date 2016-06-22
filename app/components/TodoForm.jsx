import React from 'react';
import TodoActions from '../actions/TodoActions';

class TodoForm extends React.Component {
	  constructor(props) {
		    super(props);

		    this.state = {
			      description: '',
			      priority: 1
		    };

        this.handleInputDescription = this.handleInputDescription.bind(this);
        this.handleSelectPriority = this.handleSelectPriority.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleInputDescription(e) {
        let value = e.target.value;
        this.setState({
            description: value
        });
    }

    handleSelectPriority(e) {
        let value = e.target.value;
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
                <form onSubmit={this.handleSubmit}>
                    <dl className="form">
                        <dt><label>Description</label></dt>
                        <dd><input type="text" className="textfield" placeholder="Task Description" value={this.state.description} onChange={this.handleInputDescription}/></dd>
                    </dl>
                    <dl className="form">
                        <dt><label>Priority</label></dt>
                        <dd>
                            <select value={this.state.priority} onChange={this.handleSelectPriority}>
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

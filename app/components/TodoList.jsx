import React from 'react';
import Prism from 'backbone.prism';
import Todo from './Todo.jsx';

class TodoList extends React.Component {
	render() {
		if (!this.props.view.isInitialized()) {
			return (
                <div className="blankslate">
					Loading data...
                </div>
            );
		}
		
        if (this.props.view.length === 0) {
            return (
                <div className="blankslate">
                    <h3><span className="octicon octicon-beer">&nbsp;</span>Cheers, no tasks</h3>
                    <p>Try adding more tasks using the form at your left.</p>
                </div>
            );
        }

        let renderer = model => {
            return <Todo channel={this.props.channel} key={model.cid} model={model} />
        };

		let values = this.props.values();
		
        return (
            <div>
                {values.view.map(renderer)}
            </div>
        );
    }
}

export default Prism.compose(React, TodoList);

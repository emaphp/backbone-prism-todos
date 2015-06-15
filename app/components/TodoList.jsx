import React from 'react';
import Prism from 'backbone.prism';
import Todo from './Todo.jsx';

export default React.createClass({
    mixins: [Prism.ViewMixin],

    render() {
        if (this.state.view.length === 0) {
            return (
                <div className="blankslate">
                    <h3><span className="octicon octicon-beer">&nbsp;</span>Cheers, no tasks</h3>
                    <p>Try adding more tasks using the form at your left.</p>
                </div>
            );
        }

        let renderer = model => {
            return <Todo key={model.cid} model={model} />
        };

        return (
            <div>
                {this.state.view.map(renderer)}
            </div>
        );
    }
});

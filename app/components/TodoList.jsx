var React = require('react');
var Todo = require('./Todo.jsx');
var Prism = require('backbone.prism');

var TodoList = React.createClass({
    mixins: [Prism.ViewMixin],

    render: function () {
        if (this.state.view.length === 0) {
            return (
                <div className="blankslate">
                    <h3><span className="octicon octicon-beer">&nbsp;</span>Cheers, no tasks</h3>
                    <p>Try adding more tasks using the form at your left.</p>
                </div>
            );
        }

        var renderer = function (model) {
            return <Todo key={model.cid} model={model} />
        };

        return (
            <div>
                {this.state.view.map(renderer)}
            </div>
        );
    }
});

module.exports = TodoList;

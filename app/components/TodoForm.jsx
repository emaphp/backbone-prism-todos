var React = require('react');
var TodosMixin = require('../mixins/TodosMixin');

var TodoForm  = React.createClass({
    mixins: [TodosMixin],

    getInitialState: function () {
        return {
            description: '',
            priority: 1
        };
    },

    //
    // Handlers
    //

    handleInputDescription: function (e) {
        var value = $(e.target).val();
        this.setState({
            description: value
        });
    },

    handleSelectPriority: function(e) {
        var value = $(e.target).val();
        this.setState({
            priority: value
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();

        if (!this.state.description) {
            return;
        }

        var item = {
            description: this.state.description,
            priority: this.state.priority,
            created_at: (new Date()).getTime(),
            closed: false
        };

        this.doAddItem(item);
        this.setState(this.getInitialState());
    },

    //
    // Render
    //

    render: function () {
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
});

module.exports = TodoForm;

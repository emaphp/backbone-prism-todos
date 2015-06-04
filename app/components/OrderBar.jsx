var React = require('react');
var OrderOption = require('./OrderOption.jsx');

var OrderBar = React.createClass({
    getInitialState: function () {
        return {
            field: 'created_at'
        };
    },

    componentDidMount: function () {
        var view = this.props.view;

        this.comparator = view.createComparator(function () {
            var field = this.state.field;

            return function (model1, model2) {
                if (field == 'description') {
                    return model2.get(field) < model1.get(field);
                }

                return model2.get(field) > model1.get(field);
            };
        }, this);
    },

    componentWillUnmount: function () {
        this.comparator.destroy();
    },

    handleOptionClick: function (field) {
        this.setState({field: field}, this.comparator.update());
    },

    render: function () {
        return (
            <div className="order-bar">
                Order by: &nbsp;
                <OrderOption name="Creation Date" field="created_at" selected={this.state.field} handler={this.handleOptionClick}/>
                <OrderOption name="Description" field="description" selected={this.state.field} handler={this.handleOptionClick}/>
                <OrderOption name="Priority" field="priority" selected={this.state.field} handler={this.handleOptionClick}/>
            </div>
        );
    }
});

module.exports = OrderBar;

import React from "react";
import OrderOption from './OrderOption.jsx';

export default React.createClass({
    getInitialState() {
        return {
            field: 'created_at'
        };
    },

    componentDidMount() {
        let view = this.props.view;

        this.comparator = view.createComparator(() => {
            let field = this.state.field;

            return (model1, model2) => {
                if (field == 'description') {
                    return model2.get(field) < model1.get(field);
                }

                return model2.get(field) > model1.get(field);
            };
        }, this);
    },

    componentWillUnmount() {
        this.comparator.destroy();
    },

    handleOptionClick(field) {
        this.setState({field}, this.comparator.update());
    },

    render() {
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

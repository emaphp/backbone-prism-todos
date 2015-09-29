import React from "react";
import OrderOption from './OrderOption.jsx';
import _ from 'underscore';

class OrderBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			field: 'created_at'
		};
	}
	
	componentWillMount() {
		let view = this.props.target;

        this.comparator = view.createComparator(() => {
            let field = this.state.field;

            return (model1, model2) => {
                if (field == 'description') {
                    return model2.get(field) < model1.get(field);
                }

                return model2.get(field) > model1.get(field);
            };
        }, this);
        
        this.comparatorCallback = _.bind(() => this.comparator.apply(), this);
	}
	
	componentWillUnmount() {
        this.comparator.destroy();
    }
    
    handleOptionClick(field) {
        this.setState({field}, this.comparatorCallback);
    }
    
    render() {
        return (
            <div className="order-bar">
                Order by: &nbsp;
                <OrderOption name="Creation Date" field="created_at" selected={this.state.field} handler={_.bind(this.handleOptionClick, this)}/>
                <OrderOption name="Description" field="description" selected={this.state.field} handler={_.bind(this.handleOptionClick, this)}/>
                <OrderOption name="Priority" field="priority" selected={this.state.field} handler={_.bind(this.handleOptionClick, this)}/>
            </div>
        );
    }
}

export default OrderBar;

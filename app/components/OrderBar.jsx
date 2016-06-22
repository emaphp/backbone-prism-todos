import React from 'react';
import OrderOption from './OrderOption.jsx';

class OrderBar extends React.Component {
	  constructor(props) {
		    super(props);

		    this.state = {
			      field: 'created_at'
		    };

        this.handleOptionClick = this.handleOptionClick.bind(this);
	  }

	  componentWillMount() {
		    let view = this.props.orderOn;

        this.comparator = view.createComparator(this, () => {
            let field = this.state.field;

            return (model1, model2) => {
                if (field == 'description') {
                    return model2.get(field) < model1.get(field);
                }

                return model2.get(field) > model1.get(field);
            };
        });
	  }

	  componentWillUnmount() {
        this.comparator.destroy();
    }

    handleOptionClick(field) {
        this.setState({field}, this.comparator.eval());
    }

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
}

export default OrderBar;

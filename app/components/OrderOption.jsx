import React from 'react';
import _ from 'underscore';

class OrderOption extends React.Component {
	handleClick(e) {
		e.preventDefault();
		this.props.handler(this.props.field);
	}
	
	getStatusClass() {
		return 'status' +  (this.props.selected === this.props.field ? ' status-selected' : '');
	}
	
	render() {
		return (<a href="#" className={this.getStatusClass()} onClick={_.bind(this.handleClick, this)}>{this.props.name}</a>);
	}
}

export default OrderOption;

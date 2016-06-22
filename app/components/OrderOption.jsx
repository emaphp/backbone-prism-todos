import React from 'react';

class OrderOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

	  handleClick(e) {
		    e.preventDefault();
		    this.props.handler(this.props.field);
	  }

	  getStatusClass() {
		    return 'status' +  (this.props.selected === this.props.field ? ' status-selected' : '');
	  }

	  render() {
		    return (<a href="#" className={this.getStatusClass()} onClick={this.handleClick}>{this.props.name}</a>);
	  }
}

export default OrderOption;

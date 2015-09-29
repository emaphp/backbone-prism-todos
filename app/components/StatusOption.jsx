import React from 'react';
import _ from 'underscore';

class StatusOption extends React.Component {
	handleClick(e) {
        e.preventDefault();
        this.props.handler(this.props.option);
    }
    
    getStatusClass() {
		return 'status' +  (this.props.selected === this.props.option ? ' status-selected' : '');
	}
	
	render() {
		return (
            <a href="#" className={this.getStatusClass()} onClick={_.bind(this.handleClick, this)}>{this.props.name}&nbsp;<span className="counter">{this.props.total}</span></a>
        );
	}
}

export default StatusOption;

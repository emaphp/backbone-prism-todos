import React from 'react';

class StatusOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

	  handleClick(e) {
        e.preventDefault();
        this.props.handler(this.props.option);
    }

    getStatusClass() {
		    return 'status' +  (this.props.selected === this.props.option ? ' status-selected' : '');
	  }

	  render() {
		    return (
            <a href="#" className={this.getStatusClass()} onClick={this.handleClick}>{this.props.name}&nbsp;<span className="counter">{this.props.total}</span></a>
        );
	  }
}

export default StatusOption;

import React from 'react';

export default React.createClass({
    handleClick(e) {
        e.preventDefault();
        this.props.handler(this.props.option);
    },

    getStatusClass() {
        return 'status' +  (this.props.selected === this.props.option ? ' status-selected' : '');
    },

    render() {
        return (
            <a href="#" className={this.getStatusClass()} onClick={this.handleClick}>{this.props.name}&nbsp;<span className="counter">{this.props.total}</span></a>
        );
    }
});

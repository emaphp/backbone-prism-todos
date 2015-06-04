var React = require('react');

var StatusOption = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        this.props.handler(this.props.option);
    },

    getStatusClass: function () {
        return 'status' +  (this.props.selected === this.props.option ? ' status-selected' : '');
    },

    render: function () {
        return (
            <a href="#" className={this.getStatusClass()} onClick={this.handleClick}>{this.props.name}&nbsp;<span className="counter">{this.props.total}</span></a>
        );
    }
});

module.exports = StatusOption;

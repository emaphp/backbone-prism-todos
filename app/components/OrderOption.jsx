var React = require('react');

var OrderOption = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        this.props.handler(this.props.field);
    },

    getStatusClass: function () {
        return 'status' +  (this.props.selected === this.props.field ? ' status-selected' : '');
    },

    render: function () {
        return (
            <a href="#" className={this.getStatusClass()} onClick={this.handleClick}>{this.props.name}</a>
        );
    }
});

module.exports = OrderOption;

var React = require('react');
var Prism = require('backbone.prism');

var PaginationBar = React.createClass({
    mixins: [Prism.ViewMixin],

    getInitialState: function () {
        return {
            page: 1
        };
    },

    componentDidMount: function () {
        var view = this.props.view;

        this.paginator = view.createMutator(function () {
            var page = this.state.page;
            var pageSize = this.props.pageSize;

            return {
                offset: pageSize * (page - 1),
                size: pageSize
            };
        }, this);

        // Reset page number when requested
        view.comply('page:reset', (function () {
            // This update will not trigger an update
            // This avoids generating a double render
            this.applyState({page: 1});
            this.paginator.apply(true);
        }).bind(this));
    },

    componentWillUnmount: function () {
        this.paginator.destroy();
    },

    handlePageClick: function (e) {
        e.preventDefault();

        // Update state silently and evaluate mutator
        this.applyState({page: +e.target.innerHTML});
        this.paginator.apply();
    },

    render: function () {
        if (this.props.view.length <= this.props.pageSize) {
            return (
                <div className="pagination-bar">
                    <a key={1} className={'page-option page-disabled'} href="#" onClick={function(e){e.preventDefault();}}>1</a>
                </div>
            );
        }

        var pages = Math.ceil(this.props.view.length / this.props.pageSize);
        var renderer = (function (page) {
            return <a key={page} href="#" className={'page-option ' + ((page + 1 === this.state.page) ? 'page-selected' : '')} onClick={this.handlePageClick}>{page + 1}</a>
        }).bind(this);

        return (
            <div className="pagination-bar centered">
                {_(pages).times(renderer)}
            </div>
        );
    }
});

module.exports = PaginationBar;

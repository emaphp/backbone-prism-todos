import React from 'react';
import Prism from 'backbone.prism';

export default React.createClass({
    mixins: [Prism.ViewMixin],

    getInitialState() {
        return {
            page: 1
        };
    },

    componentDidMount() {
        let view = this.props.view;
        let channel = this.props.channel;

        this.paginator = view.createMutator(() => {
            let page = this.state.page;
            let pageSize = this.props.pageSize;

            return {
                offset: pageSize * (page - 1),
                size: pageSize
            };
        }, this);

        // Reset page number when requested
        channel.on('page:reset', (() => {
            // This update will not trigger an update, avoiding a double render
            this.mergeState({page: 1}, this.paginator.update(true));
        }).bind(this));
    },

    componentWillUnmount() {
        this.paginator.destroy();
    },

    handlePageClick(e) {
        e.preventDefault();

        // Update state silently and evaluate mutator
        this.mergeState({page: +e.target.innerHTML}, this.paginator.update());
    },

    render() {
        if (this.props.view.length <= this.props.pageSize) {
            return (
                <div className="pagination-bar">
                    <a key={1} className={'page-option page-disabled'} href="#" onClick={function(e){e.preventDefault();}}>1</a>
                </div>
            );
        }

        let pages = Math.ceil(this.props.view.length / this.props.pageSize);
        let renderer = (page => {
            let style = (page + 1 === this.state.page) ? 'page-selected' : '';
            return (
                <a key={page} href="#" className={'page-option ' + style} onClick={this.handlePageClick}>{page + 1}</a>
            );
        }).bind(this);

        return (
            <div className="pagination-bar centered">
                {_(pages).times(renderer)}
            </div>
        );
    }
});

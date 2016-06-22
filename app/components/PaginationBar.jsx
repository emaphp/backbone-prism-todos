import React from 'react';
import Prism from '../backbone.prism';
import _ from 'underscore';

class PaginationBar extends React.Component {
	  constructor(props) {
		    super(props);

		    this.state = {
			      page: 1
		    };

        this.handlePageClick = this.handlePageClick.bind(this);
	  }

	  componentWillMount() {
        let channel = this.props.channel;
        this.paginator = this.props.paginateOn.createPaginator(this, this.props.pageSize, this.state.page);

        // Reset page number when requested
        channel.on('page:reset', () => {
            this.paginator.setPage(1);
            this.paginator.updateComponentState({page: 1}, true);
        }, this);
	  }

	  componentWillReceiveProps(nextProps) {
        let pages = this.paginator.getTotalPages(nextProps.view.length);

		    // Check if paginator is out of bounds
		    if (this.state.page > pages) {
            this.paginator.setPage(pages);
			      this.setState({ page: pages }, this.paginator.eval());
		    }
	  }

	  componentWillUnmount() {
		    this.paginator.destroy();
	  }

	  handlePageClick(e) {
        e.preventDefault();

        let page = +e.target.innerHTML;
        this.paginator.setPage(page);
        this.setState({page}, this.paginator.eval());
    }

    render() {
		    if (!this.props.view.isInitialized()) {
			      return (
                <div className="pagination-bar">
                </div>
            );
		    }

        if (this.props.view.length <= this.props.pageSize) {
            return (
                <div className="pagination-bar">
                    <a key={1} className={'page-option page-disabled'} href="#" onClick={function(e){e.preventDefault();}}>1</a>
                </div>
            );
        }

        let pages = this.paginator.getTotalPages(this.props.view.length);
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
}

export default Prism.compose(PaginationBar, ['view']);

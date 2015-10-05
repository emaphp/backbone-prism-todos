import React from 'react';
import Prism from 'backbone.prism';
import _ from 'underscore';

class PaginationBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 1
		};
	}
	
	componentWillMount() {
		let view = this.props.target;
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
        channel.on('page:reset', _.bind(() => this.paginator.update({page: 1}, true), this));

        this.paginatorCallback = _.bind(() => this.paginator.apply(), this);
	}
	
	totalPages(totalItems, pageSize) {
		return Math.ceil(totalItems / pageSize);
	}
	
	componentWillReceiveProps(nextProps) {
		let values = nextProps.values();
		let pages = this.totalPages(values.view.length, this.props.pageSize);
		
		// Check if paginator is out of bounds
		if (this.state.page > pages) {
			this.setState({ page: pages }, this.paginatorCallback);
		}
	}
	
	componentWillUnmount() {
		this.paginator.destroy();
	}
	
	handlePageClick(e) {
        e.preventDefault();

        // Update state silently and evaluate mutator
        this.setState({page: +e.target.innerHTML}, this.paginatorCallback);
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

        let pages = Math.ceil(this.props.view.length / this.props.pageSize);
        let renderer = (page => {
            let style = (page + 1 === this.state.page) ? 'page-selected' : '';
            return (
                <a key={page} href="#" className={'page-option ' + style} onClick={_.bind(this.handlePageClick, this)}>{page + 1}</a>
            );
        }).bind(this);

        return (
            <div className="pagination-bar centered">
                {_(pages).times(renderer)}
            </div>
        );
    }
}

export default Prism.compose(React, PaginationBar);

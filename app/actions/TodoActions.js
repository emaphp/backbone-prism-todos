import dispatcher from '../dispatcher';

let TodoActions = {
	addItem(item) {
		dispatcher.handleViewAction({
			type: 'add-item',
			data: item
		});
	},

	removeItem(id) {
		dispatcher.handleViewAction({
			type: 'remove-item',
			data: id
		});
	},

	switchStatus(id) {
		dispatcher.handleViewAction({
			type: 'switch-status',
			data: id
		});
	}
};

export default TodoActions;

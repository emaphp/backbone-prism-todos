import Backbone from 'backbone';
import Prism from 'backbone.prism';
import dispatcher from '../dispatcher';

let Todo = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("Todos"),
});

let TodoStore = Prism.Store.extend({
    name: 'todos',
    model: Todo,
    localStorage: new Backbone.LocalStorage("Todos"),
});

// Create store instance
let todoStore = new TodoStore();

todoStore.dispatchToken = dispatcher.register(payload => {
	let action = payload.action;
	
	switch (action.type) {
		case 'add-item': {
			todoStore.create(action.data, action.options);
		};
		break;
		
		case 'remove-item': {
			let model = todoStore.get(action.data);
			model.destroy(action.options);
		};
		break;
		
		case 'switch-status': {
			let model = todoStore.get(action.data);
			let status = !model.get('closed');
			model.set('closed', status);
			model.save(action.options);
		};		
		break;
		
		default:
	}
});

export default todoStore;

import Backbone from 'backbone';
import Prism from 'backbone.prism';
import dispatcher from '../dispatcher';

let Todo = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("Todos"),
});

let TodosStore = Prism.Store.extend({
    name: 'todos',
    model: Todo,
    localStorage: new Backbone.LocalStorage("Todos"),
});

// Create store instance
let todosStore = new TodosStore();

// Register methods
todosStore.register(dispatcher, {
    'add-item' (item, options) {
        this.create(item, options);
    },

    'remove-item' (id, options) {
        let model = this.get(id);
        model.destroy(options);
    },

    'switch-status' (id, options) {
        let model = this.get(id);
        let status = !model.get('closed');
        model.set('closed', status);
        model.save(options);
    }
});

export default todosStore;

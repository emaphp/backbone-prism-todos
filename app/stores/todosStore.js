var Backbone = require('backbone');
var Prism = require('backbone.prism');
var dispatcher = require('../dispatcher');

var Todo = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("Todos"),
});

var TodosStore = Prism.Store.extend({
    name: 'todos',
    model: Todo,
    localStorage: new Backbone.LocalStorage("Todos"),
});

// Create store instance
var todosStore = new TodosStore();

// Register actions
todosStore.register(dispatcher, {
    'add-item': function (item, options) {
        this.create(item, options);
    },

    'remove-item': function (id, options) {
        var model = this.get(id);
        model.destroy(options);
    },

    'switch-status': function (id, options) {
        var model = this.get(id);
        var status = !model.get('closed');
        model.set('closed', status);
        model.save(options);
    }
});

module.exports = todosStore;

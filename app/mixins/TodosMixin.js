var dispatcher = require('../dispatcher');

module.exports = {
    doAddItem: function(item, options) {
        dispatcher.handleViewAction({
            type: 'todos:add-item',
            data: item,
            options: options
        });
    },

    doRemoveItem: function (id, options) {
        dispatcher.handleViewAction({
            type: 'todos:remove-item',
            data: id,
            options: options
        });
    },

    doSwitchStatus: function (id, options) {
        dispatcher.handleViewAction({
            type: 'todos:switch-status',
            data: id,
            options: options
        });
    }
};

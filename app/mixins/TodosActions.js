import dispatcher from '../dispatcher';

export default {
    doAddItem (item, options) {
        dispatcher.handleViewAction({
            type: 'todos:add-item',
            data: item,
            options
        });
    },

    doRemoveItem (id, options) {
        dispatcher.handleViewAction({
            type: 'todos:remove-item',
            data: id,
            options
        });
    },

    doSwitchStatus (id, options) {
        dispatcher.handleViewAction({
            type: 'todos:switch-status',
            data: id,
            options
        });
    }
};

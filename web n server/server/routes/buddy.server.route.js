const buddy = require('../controllers/buddy.server.controller');

module.exports = function (app) {
    app.route('/api/buddy/all').get(buddy.list);
    app.route('/api/buddy/add').post(buddy.create);
    app.route('/api/buddy/:service/:id').post(buddy.getBuddyById);
    app.route('/api/buddy/edit/:service/:id').post(buddy.updateBuddyById);
    app.route('/api/buddy/delete/:service/:id').post(buddy.deleteBuddy);
};
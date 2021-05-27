const controller = require('../controllers/controllers');

async function routes(app, opts) {
    app.route({
        method: 'GET',
        url: '/job/applications',
        handler: controller.getAllApplications
    });

    app.route({
        method: 'GET',
        url: '/job/applications/:id',
        handler: controller.getApplication
    });

    app.route({
        method: 'GET',
        url: '/job/applications/filter',
        handler: controller.filterApplications
    });

    app.route({
        method: 'POST',
        url: '/job/applications',
        handler: controller.addApplication
    });

    app.route({
        method: 'PATCH',
        url: '/job/applications/:id',
        handler: controller.updateApplication
    });
};

module.exports = routes;
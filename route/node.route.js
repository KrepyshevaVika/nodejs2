module.exports = function(app) {
    const menuItems = require('../controller/nodes.controller.js');

    app.post('/nodes', menuItems.create);

    app.get('/nodes', menuItems.findTopNodeAll);

    app.get('/nodes/all', menuItems.findAll);
 
    app.get('/nodes/:id/children', menuItems.findChildren);

    app.get('/nodes/:id', menuItems.findById);
 
    app.delete('/nodes/:id', menuItems.delete);

    app.put('/nodes', menuItems.update);

    app.get('/', menuItems.findChooseFields);
}
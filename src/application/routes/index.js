const {peopleController, planetsController} = require('../controllers');
const routes = (app) => {
  app.get('/people', peopleController.getAll);
  app.get('/planets', planetsController.getAll);
}

module.exports = routes;
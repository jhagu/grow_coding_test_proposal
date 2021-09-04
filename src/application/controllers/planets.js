const { PlanetsService } = require('../../services');

async function getAll(req, res, next) {
  try {
    const planetsService = new PlanetsService();
    const planets = await planetsService.getAll();
    return res.status(200).json(planets)
  } catch(err){
    next(err)
  }
}

module.exports = {
  getAll
}
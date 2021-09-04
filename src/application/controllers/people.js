const { PeopleService } = require('../../services');
const validateRequest = require('../common/validateRequest');
const Joi = require('joi');

async function getAll(req, res, next) {
  const schema = Joi.object({
    sortBy: Joi.string().valid(['height', 'mass', 'name'])
  })
  try {
    const { sortBy } = req.query;
    validateRequest({ sortBy }, schema);
    const peopleService = new PeopleService();
    const people = await peopleService.getAll(sortBy);
    return res.status(200).json(people)
  } catch(err){
    next(err)
  }
}

module.exports = {
  getAll
}
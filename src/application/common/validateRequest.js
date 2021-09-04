const {BadRequestError} = require('./errors')
const Joi = require('joi');

const validateIncomingRequest = (objectToValidate, joiSchema) => {
  const { error } = Joi.validate(objectToValidate, joiSchema);
  if(error){
    throw new BadRequestError('INVALID_SCHEMA', error.message)
  }
}

module.exports = validateIncomingRequest;
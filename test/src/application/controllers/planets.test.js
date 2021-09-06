const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const { planetsController } = require('../../../../src/application/controllers');
const { PlanetsService } = require('../../../../src/services');

const planetsWithResidentsStub = require('../../../stubs/application/controllers/planets.json');

describe('PlanetsController', async() => {
  let req, res, next, status, json, planetsServiceStub
  beforeEach(() => {
    req = {}
    json = sinon.spy();
    status = sinon.stub();
    res = { status, json };
    status.returns(res);
    next = function(){}
    planetsServiceStub = sinon.stub(PlanetsService.prototype, 'getAll');
  });
  it('getAll(), should return a list of planets with residents name', async () => {
    planetsServiceStub.returns(Promise.resolve(planetsWithResidentsStub));
    await planetsController.getAll(req, res, next);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(200);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0]).to.deep.equal(planetsWithResidentsStub)
  });
});

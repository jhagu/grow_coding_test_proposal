const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const PlanetsService = require('../../../src/services/planets');
const SwapiService = require('../../../src/services/common/swapi');

const [ first ] = require('../../stubs/services/planets/planets.json');
const character = require('../../stubs/services/people/peopleById.json');

describe('Planets Service', async () => {
  let swapiServiceListMethodStub;
  let swapiServiceGetByUrlMethodStub;
  const planetService = new PlanetsService();
  beforeEach(() => {
    swapiServiceListMethodStub = sinon.stub(SwapiService.prototype, 'list');
    swapiServiceGetByUrlMethodStub = sinon.stub(SwapiService.prototype, 'getByUrl');
  });
  afterEach(function () {
    swapiServiceListMethodStub.restore();
    swapiServiceGetByUrlMethodStub.restore();
  });

  it('Should create PlanetsService instance', () => {
    expect(planetService).to.be.an('object').to.have.property('_url');
    expect(planetService).to.be.an('object').to.have.property('_resource').to.equal('planets');
  });
  it('getAll(), should return a list of planets with residents by name', async () => {
    swapiServiceListMethodStub.returns(Promise.resolve([...first.data.results]));
    swapiServiceGetByUrlMethodStub.returns(Promise.resolve({...character.data}))
    const planetList = await planetService.getAll();
    expect(planetList).to.be.an('array');
    expect(planetList[0]).to.be.an('object').to.have.property('residents').to.be.an('array');
  });
})
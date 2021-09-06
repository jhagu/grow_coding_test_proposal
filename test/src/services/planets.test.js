const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const { PlanetsService } = require('../../../src/services');
const SwapiService = require('../../../src/services/common/swapi');
const [ first ] = require('../../stubs/services/planets/planets.json');
const character = require('../../stubs/services/people/peopleById.json');

describe('Planets Service', async () => {
  let swapiServiceListMethodStub, swapiServiceGetByUrlMethodStub, planetService;
  beforeEach(() => {
    swapiServiceListMethodStub = sinon.stub(SwapiService.prototype, 'list');
    swapiServiceGetByUrlMethodStub = sinon.stub(SwapiService.prototype, 'getByUrl');
    planetService = new PlanetsService();
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
    swapiServiceListMethodStub.returns([...first.data.results]);
    swapiServiceGetByUrlMethodStub.returns({...character.data});
    const planetList = await planetService.getAll();
    expect(planetList).to.be.an('array');
    expect(planetList[0]).to.be.an('object').to.have.property('residents').to.be.an('array');
    expect(planetList[0].residents.indexOf('Luke Skywalker')).not.to.be.equal(-1)
  });
  it('getAll(), should catch and throw err', async() => {
    swapiServiceListMethodStub.throws(new Error('Error fetching data'));
    try{
      await planetService.getAll();
    } catch(err){
        expect(err).to.be.an('error')
          .to.have.property('message')
          .to.equal('Error fetching data');
    }
  });
})
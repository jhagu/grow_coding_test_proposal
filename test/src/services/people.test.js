const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const PeopleService = require('../../../src/services/people');
const SwapiService = require('../../../src/services/common/swapi');
const [ first, second ] = require('../../stubs/services/people/people.json');

describe('People Service', async () => {
  let swapiServiceListMethodStub;
  let swapiServiceGetByUrlMethodStub;
  const peopleService = new PeopleService();
  beforeEach(() => {
    swapiServiceListMethodStub = sinon.stub(SwapiService.prototype, 'list');
    swapiServiceGetByUrlMethodStub = sinon.stub(SwapiService.prototype, 'getByUrl');
  });
  afterEach(function () {
    swapiServiceListMethodStub.restore();
    swapiServiceGetByUrlMethodStub.restore();
  });

  it('Should create PeopleService instance', () => {
    expect(peopleService).to.be.an('object').to.have.property('_url');
    expect(peopleService).to.be.an('object').to.have.property('_resource').to.equal('people');
  });
  it('getAll(), should return a list of people', async () => {
    swapiServiceListMethodStub.returns(Promise.resolve([...first.data.results, ...second.data.results]));
    const peopleList = await peopleService.getAll();
    expect(peopleList).to.be.an('array');
  });
})
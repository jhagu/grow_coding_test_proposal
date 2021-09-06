const { default: axios } = require('axios');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('Swapi Service', async () => {
  let axiosGetStub;
  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get');
  })
  afterEach(() => {
    axiosGetStub.restore();
  })
  const SwapiService = require('../../../../src/services/common/swapi');
  it('Should create SwapiService instance', () => {
    const swapiService = new SwapiService();
    expect(swapiService).to.be.an('object').to.have.property('_url');
    expect(swapiService).to.be.an('object').to.have.property('_resource');
  });
  it('list(), should return a list of people', async () => {
    const [ first, second] = require('../../../stubs/services/people/people.json');
    axiosGetStub.onFirstCall().returns(Promise.resolve(first));
    axiosGetStub.onSecondCall().returns(Promise.resolve(second));
    const swapiService = new SwapiService('people');
    const peopleList = await swapiService.list()
    expect(peopleList).to.be.an('array')
  });
  it('getByUrl(), should return a specific resource', async () => {
    const stubbedData = require('../../../stubs/services/people/peopleById.json');
    axiosGetStub.returns(stubbedData);
    const swapiService = new SwapiService('people');
    const data = await swapiService.getByUrl();
    expect(data).to.be.an('object').to.have.property('name')
  });
  it('list(), should catch and throw err', async() => {
    axiosGetStub.throws(new Error('Error fetching data'));
    try{
      const swapiService = new SwapiService('people');
      await swapiService.list();
    } catch(err){
        expect(err).to.be.an('error')
          .to.have.property('message')
          .to.equal('Error fetching data');
    }
  });
  it('getByUrl(), should catch and throw err', async() => {
    axiosGetStub.throws(new Error('Error fetching data'));
    try{
      const swapiService = new SwapiService('people');
      await swapiService.getByUrl();
    } catch(err){
        expect(err).to.be.an('error')
          .to.have.property('message')
          .to.equal('Error fetching data');
    }
  });
})
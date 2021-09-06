const { default: axios} = require('axios');

class SwapiService {
  constructor(resource) {
    this._url = 'https://swapi.dev/api'
    this._resource = resource;
  }
  async list() {
    const collection = [];
    try {
      let next = `${this._url}/${this._resource}`;
      do {
        const data = await this.getByUrl(next);
        collection.push(...data.results);
        next = data.next;
      } while (next)
      return collection;
    } catch (err) {
      throw err;
    }
  }
  async getByUrl(url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw err;
    }

  }
}

module.exports = SwapiService;

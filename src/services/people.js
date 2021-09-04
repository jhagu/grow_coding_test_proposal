const SwapiService = require("./common/swapi");

class PeopleService extends SwapiService {
  constructor() {
    super('people');
  }

  async getAll(sortBy = null) {
    try {
      let people = await super.list();
      if (sortBy) {
        people = people.sort((a, b) => {
          if (sortBy === 'mass' || sortBy === 'height') {
            return a[sortBy] - b[sortBy];
          } else {
            a = a[sortBy].toLowerCase();
            b = b[sortBy].toLowerCase();
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
          }
        });
      }
      return people;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PeopleService;

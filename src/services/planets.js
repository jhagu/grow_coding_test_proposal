const SwapiService = require("./common/swapi");

class PlanetsService extends SwapiService {
  constructor() {
    super('planets')
  }

  async getAll() {
    try {
      let planets = await super.list();
      const residentsByPlanets = planets.map(async (planet) => {
        const residentsByName = await this.getResidentsNameByPlanet(planet);
        planet = {
          ...planet,
          residents: residentsByName
        }
        return planet;
      })
      const all = await Promise.all(residentsByPlanets);
      return all;
    } catch (err) {
      throw err;
    }
  }

  async getResidentsNameByPlanet({ residents }) {
    try {
      residents = await Promise.all(
        residents.map(async resident => {
          const data = await super.getByUrl(resident);
          resident = data.name;
          return resident;
        })
      );
      return residents;
    } catch (err) {
      throw err;
    }

  }
}

module.exports = PlanetsService;
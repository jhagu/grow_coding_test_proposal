# Grow Coding Test Proposal #

This is the proposal for Grow Coding Test.
The goal is retrieve data from [SWAPI](https://swapi.dev/), manipulates and returns the data with an Express server.

## Exposed endpoints

### GET /people  

Returns an array with all the SW universe characters

Can receive a query param `sortBy` that accepts `name`, `heigth` or `mass` as values

Example 
```
GET /people?sortBy=mass
```

### GET /planets

Returns an array with all the SW universe planets and the residents name by planet

Example

``` 
GET /planets
```

## How to run
1. Clone the repository
2. Install the packages
  ```
  npm install
  ```
3. Run tests
```
npm run test
```

4. Start server
```
npm run Start
```

5. Go to [People](https://localhost:3000/people) or [Planets](https://localhost:3000/planets) in your browser. In addition, you can use [Postman](https://www.postman.com/) or similar.


Have fun!

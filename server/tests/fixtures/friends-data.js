const { ObjectID } = require('mongodb');
// ADD COUNTRY, REGION, AND CITY ID'S
const friends = [{
  name: 'Rafael',
  relationship: 'friend',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  ranking: 5,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e88'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Keenan',
  relationship: 'friend',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  ranking: 5,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e89'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Kyle',
  relationship: 'friend',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  ranking: 5,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e8a'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Jorge',
  relationship: 'friend',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Alabama',
    regionId: 'AL',
    city: 'Huntsville',
    cityId: 'AL'
  },
  ranking: 5,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e8b'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Jose',
  relationship: 'acquaintance',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Texas',
    regionId: 'TX',
    city: 'El Paso',
    cityId: 'TX'
  },
  ranking: 3,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e8c'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Juan',
  relationship: 'acquaintance',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Alabama',
    regionId: 'AL',
    city: 'Birmingham',
    cityId: 'AL'
  },
  ranking: 1,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e8d'),
  _creator: '5b97cf9503dc841653c6f108'
}, {
  name: 'Raul',
  relationship: 'family',
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Nevada',
    regionId: 'NV',
    city: 'Las Vegas',
    cityId: 'NV'
  },
  ranking: 5,
  _id: ObjectID('5b9d38a38fbeaf13bc4a2e8e'),
  _creator: '5b97cf9503dc841653c6f108'
}];

module.exports = {
  friends
};

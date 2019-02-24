const { ObjectID } = require('mongodb');

const friends = [{
  name: 'Rafael',
  order: {
    default: 0,
    current: 0
  },
  relationship: {
    friend: true,
    family: false,
    acquaintance: false
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  dateAdded: new Date(),
  ranking: 5,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e88'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Keenan',
  order: {
    default: 1,
    current: 1
  },
  relationship: {
    friend: true,
    family: false,
    acquaintance: false
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  dateAdded: new Date(),
  ranking: 5,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e89'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Kyle',
  order: {
    default: 2,
    current: 2
  },
  relationship: {
    friend: true,
    family: false,
    acquaintance: false
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Tennessee',
    regionId: 'TN',
    city: 'Nashville',
    cityId: 'TN'
  },
  dateAdded: new Date(),
  ranking: 5,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e8a'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Jorge',
  order: {
    default: 3,
    current: 3
  },
  relationship: {
    friend: true,
    family: false,
    acquaintance: false
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Alabama',
    regionId: 'AL',
    city: 'Huntsville',
    cityId: 'AL'
  },
  dateAdded: new Date(),
  ranking: 5,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e8b'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Jose',
  order: {
    default: 4,
    current: 4
  },
  relationship: {
    friend: false,
    family: false,
    acquaintance: true
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Texas',
    regionId: 'TX',
    city: 'El Paso',
    cityId: 'TX'
  },
  dateAdded: new Date(),
  ranking: 3,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e8c'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Juan',
  order: {
    default: 5,
    current: 5
  },
  relationship: {
    friend: false,
    family: false,
    acquaintance: true
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Alabama',
    regionId: 'AL',
    city: 'Birmingham',
    cityId: 'AL'
  },
  dateAdded: new Date(),
  ranking: 1,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e8d'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}, {
  name: 'Raul',
  order: {
    default: 6,
    current: 6
  },
  relationship: {
    friend: false,
    family: true,
    acquaintance: false
  },
  location: {
    country: 'United States',
    countryId: '6252001',
    region: 'Nevada',
    regionId: 'NV',
    city: 'Las Vegas',
    cityId: 'NV'
  },
  dateAdded: new Date(),
  ranking: 5,
  _id: new ObjectID('5b9d38a38fbeaf13bc4a2e8e'),
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
}];

module.exports = {
  friends
};

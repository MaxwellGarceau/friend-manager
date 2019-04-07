const { ObjectID } = require('mongodb');

const defaultOptions = {
  name: 'defaultOptions',
  relationship: [
    {
      name: 'acquaintance',
      label: 'Acquaintance',
      filterCategory: 'relationship'
    },
    {
      name: 'friend',
      label: 'Friend',
      filterCategory: 'relationship'
    },
    {
      name: 'family',
      label: 'Family',
      filterCategory: 'relationship'
    }
  ],
  _creator: new ObjectID('5b97cf9503dc841653c6f108')
};

module.exports = {
  defaultOptions
}

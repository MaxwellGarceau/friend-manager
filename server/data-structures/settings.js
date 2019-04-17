const defaultSettings = {
  name: 'defaultSettings',
  relationship: [{
    name: 'acquaintance',
    label: 'Acquaintance',
    filterCategory: 'relationship'
  }]
};

const defaultFilterSettings = {
  selectedFilters: [],
  rankingSliderValue: {
    min: 1,
    max: 5
  },
  location: {
    country: '',
    countryId: 'initial',
    region: '',
    regionId: '',
    city: '',
    cityId: ''
  },
  relationship: []
};

module.exports = {
  defaultSettings,
  defaultFilterSettings
}

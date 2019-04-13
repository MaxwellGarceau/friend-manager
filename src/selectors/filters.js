import { difference } from 'lodash-es';

// Get filters by filterCategory. Accepts the list of filters and an array of filterCategories.
export const getFiltersByFilterCategory = (selectedFilters = [], filterCategories) => {
  return selectedFilters.filter((selectedFilter) => filterCategories.includes(selectedFilter.filterCategory));
}

export const arrayContainsArray = (array, values) => difference(array, values).length === 0;

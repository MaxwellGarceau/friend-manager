export const selectSettingsGroup = (settings, name) => {
  return settings.filter((settingGroup) => settingGroup.name === name)[0];
}

export const selectRelationshipOptions = (settings, name = 'defaultOptions') => {
  return settings.filter((settingGroup) => settingGroup.name === name)[0].relationship;
}

export const selectRelationshipSettings = (settings, name = 'defaultSettings') => {
  return settings.filter((settingGroup) => settingGroup.name === name)[0].relationship;
}

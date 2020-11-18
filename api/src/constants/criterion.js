export const CRIT_MOUNTAIN = 'mountain'
export const CRIT_SMALL_CITY = 'small-city'
export const CRIT_MEDIUM_CITY = 'medium-city'
export const CRIT_LARGE_CITY = 'big-city'
export const IS_SMALL_CITY = 30 // / 1000
export const IS_LARGE_CITY = 100 // / 1000
export const ALT_IS_MOUNTAIN = 1000

export const CRITERIONS = [{
  label: 'Montagne',
  tag: 'environment',
  key: CRIT_MOUNTAIN,
}, {
  label: 'Petite ville',
  tag: 'city',
  key: CRIT_SMALL_CITY,
}, {
  label: 'Ville moyenne',
  tag: 'city',
  key: CRIT_MEDIUM_CITY,
}, {
  label: 'Métropole et grande ville',
  tag: 'city',
  key: CRIT_LARGE_CITY,
}]
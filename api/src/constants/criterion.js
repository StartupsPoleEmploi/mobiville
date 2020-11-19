export const CRIT_MOUNTAIN = 'mountain'
export const CRIT_SMALL_CITY = 'small-city'
export const CRIT_MEDIUM_CITY = 'medium-city'
export const CRIT_LARGE_CITY = 'big-city'
export const CRIT_EXTRA_LARGE_CITY = 'extra-big-city'
export const IS_SMALL_CITY = 20 // / 1000
export const IS_MEDIUM_CITY = 50 // / 1000
export const IS_LARGE_CITY = 200 // / 1000
export const ALT_IS_MOUNTAIN = 200

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
  label: 'Grande ville',
  tag: 'city',
  key: CRIT_LARGE_CITY,
}, {
  label: 'Métropole',
  tag: 'city',
  key: CRIT_EXTRA_LARGE_CITY,
}]
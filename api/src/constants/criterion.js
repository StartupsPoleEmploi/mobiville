export const CRIT_MOUNTAIN = 'mountain'
export const CRIT_SMALL_CITY = 'small-city'
export const CRIT_EXTRA_LARGE_CITY = 'extra-big-city'
export const CRIT_SIDE_SEA = 'side-sea'
export const CRIT_SUN = 'need-sun'
export const CRIT_CAMPAGNE = 'campagne'
export const IS_SMALL_CITY = 20 // / 1000
export const IS_MEDIUM_CITY = 50 // / 1000
export const IS_LARGE_CITY = 200 // / 1000
export const ALT_IS_MOUNTAIN = 600
export const SIDE_SEA = 30 // in km
export const IS_SUNNY = 15 // in degres
export const CAREGIVER_ROME_CODE = 'J1501'
export const COMPUTER_MAINTENANCE_TECHNICIAN_ROME_CODE = 'I1401'
export const WEIGHT_REGION = 6


export const CODE_ROMES = [{
  label: 'Aide soignant',
  key: CAREGIVER_ROME_CODE,
}, {
  label: 'Technicien maintenance informatique',
  key: COMPUTER_MAINTENANCE_TECHNICIAN_ROME_CODE,
}]

export const CRITERIONS = [{
  label: 'Mer',
  tag: 'environment',
  icon: 'waves',
  weight: 4,
  key: CRIT_SIDE_SEA,
}, {
  label: 'Montagne',
  tag: 'environment',
  icon: 'terrain',
  weight: 4,
  key: CRIT_MOUNTAIN,
}, {
  label: 'Campagne',
  tag: 'environment',
  icon: 'nature',
  weight: 4,
  key: CRIT_CAMPAGNE,
}, {
  label: 'Métropole',
  tag: 'city',
  icon: 'apartment',
  weight: 5,
  subLabel: `+ ${IS_LARGE_CITY} 000 habitants`,
  key: CRIT_EXTRA_LARGE_CITY,
}, {
  label: 'Petite ville',
  tag: 'city',
  icon: 'person',
  weight: 5,
  subLabel: `- ${IS_SMALL_CITY} 000 habitants`,
  key: CRIT_SMALL_CITY,
}]
/** On évite de mettre les domtom dans la table régions
 *  pour qu'il ne soient pas affiché sur la home page avec les autres regions
 *  (car elles sont uni-départemental et on ne veut pas une page region avec 1 seul département)
 *  elles sont quand meme a proposé dans l'autocompletion du site (via les "criterions")
 *  TODO a refacto solution malheureusement bricolé ,
 *  soluce? : les mettre dans la table regions avec un booléen sur l'affichage de la home
 *
 */
export const DOMTOM_ID = ['1', '2', '3', '4', '6']
export const DOMTOM = [
  {
    code: '1',
    name: 'Guadeloupe',
    slug: 'guadeloupe',
  },
  {
    code: '2',
    name: 'Martinique',
    slug: 'martinique',
  },
  {
    code: '3',
    name: 'Guyane',
    slug: 'guyane',
  },
  {
    code: '4',
    name: 'La Réunion',
    slug: 'la-reunion',
  },
  // {
  //   // inexistante
  //   code: '5',
  //   name: '',
  //   slug: '',
  // },
  {
    code: '6',
    name: 'Mayotte',
    slug: 'mayotte',
  },
]

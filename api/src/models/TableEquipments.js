import { Op } from 'sequelize'
import { chunk, omit } from 'lodash'

const PARIS_CODE = 75056
const MARSEILLE_CODE = 13055
const LYON_CODE = 69123

export default (sequelizeInstance, Model) => {
  Model.sync = async ({ equipments }) => {
    await Model.deleteAll()

    let nbInserted = 0
    console.log('START SYNC EQUIPMENTS')

    // general case

    const allData = []
    for (let i = 0; i < equipments.length; i++) {
      const data = {}
      for (const [key, value] of Object.entries(equipments[i])) {
        data[key] = value || null
      }

      nbInserted++
      allData.push(data)
    }

    // using chunks to avoid going past memory limits
    for (const dataChunk of chunk(allData, 10000)) {
      await Model.bulkCreate(dataChunk)
    }

    console.log('END SYNC EQUIPMENTS')

    return {
      'nb read': equipments.length,
      'nb inserted': nbInserted,
    }
  }

  Model.syncSpecialCities = async () => {
    // for Paris, Lyon, Marseille
    console.log('START SYNC EQUIPMENTS FOR SPECIAL CITIES')
    const citiesArray = [
      {
        like: 'PARIS%ARRONDISSEMENT',
        code: PARIS_CODE,
      },
      {
        like: 'MARSEILLE%ARRONDISSEMENT',
        code: MARSEILLE_CODE,
      },
      {
        like: 'LYON%ARRONDISSEMENT',
        code: LYON_CODE,
      },
    ]

    for (const cityData of citiesArray) {
      const districts = await Model.models.cities.findAll({
        attributes: ['insee_com'],
        where: {
          nom_comm: {
            [Op.like]: cityData.like,
          },
        },
      })

      const inseeComs = districts.map(({ insee_com }) => insee_com)

      const equipments = await Model.findAll({ where: { depcom: inseeComs } })

      const amenitiesToAdd = equipments.map((equipment) => ({
        ...omit(equipment.dataValues, 'id'),
        depcom: cityData.code,
      }))

      // using chunks to avoid going past memory limits
      for (const dataChunk of chunk(amenitiesToAdd, 10000)) {
        await Model.bulkCreate(dataChunk)
      }

      console.log('END SYNC EQUIPMENTS FOR SPECIAL CITIES')
    }
  }

  Model.getTotal = async (codeCom, type) => {
    /*
      TYPEQU =>
      A101 - Police
      A104 - Gendarmerie
      A105 - Cour d???appel (CA)
      A106 - Tribunal de grande instance (TGI)
      A107 - Tribunal d???instance (TI)
      A108 - Conseil des prud???hommes (CPH)
      A109 - Tribunal de commerce (TCO)
      A115 - R??seau sp??cialis?? P??le Emploi
      A119 - Direction G??n??rale des Finances Publiques
      (DGFIP)
      A120 - Direction R??gionale des Finances Publiques
      (DRFIP)
      A121 - Direction D??partementale des Finances Publiques
      (DDFIP)
      A122 - R??seau de proximit?? P??le Emploi
      A123 - R??seau partenarial P??le Emploi
      A124 - Maison de justice et du droit
      A125 - Antenne de justice
      A126 - Conseil d??partemental d???acc??s au droit (CDAD)
      A127 ??? Maison de services au public (MSAP)
      A203 - Banque, Caisse d?????pargne
      A205 - Pompes fun??bres
      A206 - Bureau de poste
      A207 - Relais poste
      A208 - Agence postale
      A301 - R??paration auto et de mat??riel agricole
      A302 - Contr??le technique automobile
      A303 - Location auto-utilitaires l??gers
      A304 - ??cole de conduite
      A401 - Ma??on
      A402 - Pl??trier peintre
      A403 - Menuisier, charpentier, serrurier
      A404 - Plombier, couvreur, chauffagiste
      A405 - ??lectricien
      A406 - Entreprise g??n??rale du b??timent
      A501 - Coiffure
      A502 - V??t??rinaire
      A503 - Agence de travail temporaire
      A504 - Restaurant - Restauration rapide
      A505 - Agence immobili??re
      A506 ??? Pressing - Laverie automatique
      A507 - Institut de beaut?? - Onglerie
      B101 - Hypermarch??
      B102 - Supermarch??
      B103 - Grande surface de bricolage
      B201 - Sup??rette
      B202 - ??picerie
      B203 - Boulangerie
      B204 - Boucherie charcuterie
      B205 - Produits surgel??s
      B206 - Poissonnerie
      B301 - Librairie papeterie journaux
      B302 - Magasin de v??tements
      B303 - Magasin d'??quipements du foyer
      B304 - Magasin de chaussures
      B305 - Magasin d'??lectrom??nager, audio vid??o
      B306 - Magasin de meubles
      B307 - Magasin d'art. de sports et de loisirs
      B308 - Magasin de rev??tements murs et sols
      B309 - Droguerie quincaillerie bricolage
      B310 - Parfumerie - Cosm??tique
      B311 - Horlogerie Bijouterie
      B312 - Fleuriste - Jardinerie - Animalerie
      B313 - Magasin d???optique
      B315 - Magasin de mat??riel m??dical et orthop??dique
      B316 - Station service
      C101 - ??cole maternelle
      C102 - ??cole maternelle de RPI dispers??
      C104 - ??cole ??l??mentaire
      C105 - ??cole ??l??mentaire de RPI dispers??
      C201 - Coll??ge
      C301 - Lyc??e d'enseignement g??n??ral et/ou techno.
      C302 - Lyc??e d'enseignement professionnel
      C303 - Lyc??e technique et/ou professionnel agricole
      C304 - SGT : Section enseignement g??n??ral et techno.
      C305 - SEP : Section enseignement professionnel
      C401 - STS CPGE
      C402 - Formation sant??
      C403 - Formation commerce
      C409 - Autre formation post bac non universitaire
      C501 - UFR
      C502 - Institut universitaire
      C503 - ??cole d'ing??nieurs
      C504 - Enseignement g??n??ral sup??rieur priv??
      C505 - ??coles d???enseignement sup??rieur agricole
      C509 - Autre enseignement sup??rieur
      C601 - Centre de formation d'apprentis (hors agriculture)
      C602 - GRETA
      C603 - Centre dispensant de la formation continue
      agricole
      C604 - Formation aux m??tiers du sport
      C605 - Centre dispensant des formations d???apprentissage
      agricole
      C609 - Autre formation continue
      C701 - R??sidence universitaire
      C702 - Restaurant universitaire
      D101 - ??tablissement sant?? court s??jour
      D102 - ??tablissement sant?? moyen s??jour
      D103 - ??tablissement sant?? long s??jour
      D104 - ??tablissement psychiatrique avec h??bergement
      D105 - Centre lutte cancer
      D106 - Urgences
      D107 - Maternit??
      D108 - Centre de sant??
      D109 - Structure psychiatrique en ambulatoire
      D110 - Centre m??decine pr??ventive
      D111 - Dialyse
      D112 - Hospitalisation ?? domicile
      D113 - Maison de sant?? pluridisciplinaire
      D201 - M??decin g??n??raliste
      D202 - Sp??cialiste en cardiologie
      D203 - Sp??cialiste en dermatologie v??n??r??ologie
      D206 - Sp??cialiste en gastro-ent??rologie
      D207 - Sp??cialiste en psychiatrie
      D208 - Sp??cialiste en ophtalmologie
      D209 - Sp??cialiste en oto-rhino-laryngologie
      D210 - Sp??cialiste en p??diatrie
      D211 - Sp??cialiste en pneumologie
      D212 - Sp??c. en radiodiagnostic et imagerie m??dicale
      D213 - Sp??cialiste en stomatologie
      D214 - Sp??cialiste en gyn??cologie (m??dicale et/ou
      obst??trique)
      D221 - Chirurgien dentiste
      D231 - Sage-femme
      D232 - Infirmier
      D233 - Masseur kin??sith??rapeute
      D235 - Orthophoniste
      D236 - Orthoptiste
      D237 - P??dicure-podologue
      D238 - Audio proth??siste
      D239 - Ergoth??rapeute
      D240 - Psychomotricien
      D241 - Manipulateur ERM
      D242 - Di??t??ticien
      D243 - Psychologue
      D301 - Pharmacie
      D302 - Laboratoire d'analyses et de biologie m??dicales
      D303 - Ambulance
      D304 - Transfusion sanguine
      D305 - ??tablissement thermal
      D401 - Personnes ??g??es : h??bergement
      D402 - Personnes ??g??es : soins ?? domicile
      D403 - Personnes ??g??es : services d'aide
      D404 - Personnes ??g??es : foyers restaurants
      D502 - Cr??che
      D601 - Enfants handicap??s : h??bergement
      D602 - Enfants handicap??s.: soins ?? domicile
      D603 - Adultes handicap??s : accueil/h??bergement
      D604 - Adultes handicap??s : services d???aide
      D605 - Travail prot??g??
      D606 - Adultes handicap??s : services de soins ?? domicile
      D701 - Aide sociale ?? l'enfance : h??bergement
      D702 - Aide sociale ?? l'enfance : action ??duc.
      D703 - CHRS Centre d'h??berg. et de r??adapt. sociale
      D704 - Centre provisoire d'h??bergement
      D705 - Centre accueil demandeur d'asile
      D709 - Autres ??tablissements pour adultes et familles en
      difficult??
      E101 - Taxi - VTC
      E102 - A??roport
      E107 - Gare de voyageurs d???int??r??t national
      E108 - Gare de voyageurs d???int??r??t r??gional
      E109 - Gare de voyageurs d???int??r??t local
      F101 - Bassin de natation
      F102 - Boulodrome
      F103 - Tennis
      F104 - ??quipement de cyclisme
      F105 - Domaine skiable
      F106 - Centre ??questre
      F107 - Athl??tisme
      F108 - Terrain de golf
      F109 - Parcours sportif/sant??
      F110 - Sports de glace
      F111 - Plateaux et terrains de jeux ext??rieurs
      F112 - Salles sp??cialis??es
      F113 - Terrain de grands jeux
      F114 - Salles de combat
      F116 - Salles non sp??cialis??es
      F117 - Roller-Skate-V??lo bicross ou freestyle
      F118 - Sports nautiques
      F119 - Bowling
      F120 - Salles de remise en forme
      F121 - Salles multisports (gymnase)
      F201 - Baignade am??nag??e
      F202 - Port de plaisance - Mouillage
      F203 - Boucle de randonn??e
      F303 - Cin??ma
      F304 - Mus??e
      F305 - Conservatoire
      F306 - Th????tre - Art de rue - P??le cirque
      F307 - Biblioth??que
      G101 - Agence de voyages
      G102 - H??tel
      G103 - Camping
      G104 - Information touristique
    */

    if (typeof type === 'string') {
      type = [type]
    }

    const total = await Model.count({
      where: { depcom: codeCom, typequ: type },
    })

    return total
  }

  return Model
}

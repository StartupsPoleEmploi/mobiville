module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.helps.create(
      {
        title: 'Aide de 1 000 € pour le rapprochement domicile-travail',
        goal: '1000 euros pour vous rapprocher de votre travail',
        description: `Subvention de 1 000 € versée en cas de changement de logement pour :<br/> 
        vous rapprocher de votre lieu de travail ou de formation 
        saisir une opportunité professionnelle, suite à une situation de chômage, 
        ou dans le cadre d’un premier emploi ou d’un emploi en alternance.`,
        when: 'Jusqu\'à 3 mois après la signature du bail',
        conditions: `Aide soumise à conditions de ressources: Votre revenu
        est inférieur ou égale à 1,5 fois le SMIC (soit 1539 euros) 
        Le nouveau logement loué est votre résidence principale et est situé en France (métropole ou DROM). `,
        cumulable: 'Cumulable avec d\'autres aides',
        link: 'https://www.actionlogement.fr/aide-mobilite',
        who: 'salariés, demandeur d\'emploi, alternant, moins de 26 ans',
        section: 'dossier logement',
        situtation: 'je déménage',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Mobili-jeune',
        goal: 'Une prise en charge d\'une partie de votre loyer pendant un an',
        description: `L’AIDE MOBILI-JEUNE est une subvention permettant de prendre en charge une partie du loyer (entre 10 € et 100 € maximum) chaque mois et pendant un an. <br/>
        Elle s’adresse aux jeunes de moins de 30 ans, en formation en alternance (sous contrat d’apprentissage ou de professionnalisation) au sein d’une entreprise du secteur privé non agricole.`,
        when: `Au plus tard la veille de votre trentième anniversaire. <br/>
        3 mois avant le début de votre formation ou au plus tard dans les 6 mois à compter du démarrage de celle-ci. <br/>
        Si la formation dure plusieurs années, la date de démarrage pourra être celle de début de l’une d’entre elles. Dans ce cas l’aide sera versée pour l’année de formation restant.`,
        conditions: `Vous avez moins de 30 ans; <br/>
        Vous n'avez pas de dossier MOBILI-JEUNE® en cours chez Action Logement ;Vous êtes salarié.e d’une entreprise du secteur privé non agricole ; <br/>
        Vous êtes en contrat d’apprentissage ou de professionnalisation ; <br/>
        Vous allez être locataire d'un logement en proximité géographique avec le lieu de votre formation ou de votre entreprise ; Votre salaire mensuel brut est inférieur ou égal à 100 % du SMIC.
        `,
        cumulable: 'Cumulable avec la Garantie visale, l\'aide mobili-pass et l\'avance loca-pass',
        link: 'https://www.actionlogement.fr/l-aide-mobili-jeune',
        who: 'alternant, moins de 26 ans',
        section: 'financement logement',
        situtation: 'je déménage',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Logement temporaire',
        goal: 'Trouvez rapidement un logement de courte durée',
        description: `Les logements temporaires d’Action Logement ou les partenariats mis en place permettent aux salariés d’accéder rapidement à un logement pour une durée plus au moins longue (quelques jours à 2 ans maximum). <br/>
        Ces logements proposent des conditions tarifaires attractives, plus économique que la location classique. <br/>
        Exemple: logement meublés, logement pour jeunes travailleurs, résidence étudiante...`,
        when: 'Dès la signature d\'une promesse d\'embauche',
        conditions: 'Les solutions de logement temporaire sont accessibles dans le cadre : d’un premier emploi, d’une formation, d’une mutation professionnelle, d’une mission ponctuelle, d’une alternance, ou d’une situation exceptionnelle.',
        cumulable: 'Cumulable avec la Garantie visale, l\'aide mobili-pass, l\'aide mobili jeune et les APL',
        link: 'https://www.actionlogement.fr/les-residences-temporaires',
        who: 'salarié, demandeur d\'emploi avec promesse d\'embauche, aternance, moins de 26 ans',
        section: 'recherche logement, temporaire',
        situtation: 'je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Garantie Visale',
        goal: 'Couvrez votre loyer et ses charges locatives en cas d’impayés',
        description: 'La garantie VISALE (Visa pour le Logement et l’Emploi) est une caution locative accordée par Action Logement. Elle garantit le paiement du loyer et des charges locatives à votre propriétaire en cas de défaillance de paiement. Gratuite, elle vise à faciliter votre recherche de logement en assurant le bailleur.',
        when: ` Au plus tard dans les 6 mois après sa prise de fonction(notamment CDD, Intérim, contrats aidés, CDI période d’essai). <br/>
        Jusqu’à 6 mois après sa mutation professionnelle (changement de lieu de travail dans la même entreprise ou le même groupe).`,
        conditions: 'Jeune de 18 à 30 ans inclus, salarié à partir de 31 ans nouvellement embauché ou en mobilité, ou signataire d’un bail mobilité',
        cumulable: 'Oui, notamment avec l\'avance loca-pass',
        link: 'https://www.visale.fr/',
        who: 'salarié, demandeur d\'emploi avec promesse d\'embauche, aternance, moins de 26 ans',
        section: 'dossier logement',
        situtation: 'je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Bail mobilité',
        goal: 'Accedez à un contrat de location de meublé sans dépôt de garantie',
        description: `Le bail mobilité est un contrat de location signé entre le propriétaire d'un logement meublé et un locataire considéré comme temporaire (étudiant, salarié en mission temporaire ou en formation professionnelle, ...). Le bail est d'une durée allant de 1 à 10 mois. <br/>
        À la fin du bail, le propriétaire et le locataire ne peuvent pas signer un nouveau bail mobilité pour le même logement.`,
        when: 'Le locataire doit justifier de sa qualité lui permettant d’accéder au bail mobilité au moment de la prise d’effet du bail.',
        conditions: `Durée maximum de 10 mois non renouvelable. <br/>
        Le bail mobilité est ouvert à un locataire justifiant être : en formation professionnelle ; en études supérieures ; en contrat d'apprentissage ; en stage ; en engagement volontaire dans le cadre d'un service civique ; en mutation professionnelle ou en mission temporaire (intérimaires ou travailleurs saisonniers).<br/>
        Les logements concernés sont des logements meublés et équipés (four, réfrigérateur...): les logements Airbnb, logement de particuliers et colocations peuvent faire l'objet d'un bail mobilité.`,
        cumulable: 'oui, notamment avec la garantie Visale',
        link: 'https://www.actionlogement.fr/offre-de-location/dossiers/bail-mobilite',
        who: 'salarié, demandeur d\'emploi avec promesse d\'embauche, aternance, moins de 26 ans',
        section: 'dossier logement, logement temporaire',
        situtation: 'je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Aide pour la recherche d\'emploi',
        goal: 'Bénéficiez d\'une prise en charge de vos frais lors d\'un déplacement pour un entretien d\'embauche',
        description: `Vous vous rendez à un entretien d’embauche, vous participez à un concours public, un examen certifiant ou à une immersion professionnelle ? <br/>
        Dans le cadre de votre recherche d’emploi vous avez peut-être droit à l’aide à la mobilité de Pôle emploi. <br/>
        <br/>
        Frais de déplacement : prise en charge des km parcourus<br/>
        Billets SNCF pris en charge integralement ou a prix reduits<br/>
        Frais de repas : forfait de 6 € par jour.<br/>
        Frais d’hébergement : plafond de 30 € par nuitée dans la limite des frais que vous engagez et sur présentation des justificatifs.`,
        when: 'Votre demande doit être effectuée avant votre entretien d’embauche, votre prestation, votre immersion professionnelle (PMSMP) ou votre participation à un concours public ou à un examen certifiant, au plus tard dans un délai de 7 jours après l’entretien d’embauche, le premier jour de la prestation, de l’immersion, du concours public ou de l\'examen certifiant.',
        conditions: ` Le lieu de l’entretien d’embauche, du concours public, de l'examen certifiant ou de l’immersion professionnelle doit être situé sur le territoire français et à plus de 60 km aller-retour (ou à 2 heures de trajet aller-retour) du lieu de votre domicile. <br/>
        Pour l’Outre-mer, la condition est de 20 km aller-retour.<br/>
        L’entretien d’embauche doit concerner : soit un contrat à durée indéterminée (CDI), soit un contrat à durée déterminée (CDD) ou un contrat de travail temporaire de 3 mois consécutifs minimum, que ce soit à temps plein ou à temps partiel.  <br/>
        Vous devez être inscrit à Pôle emploi<br/>
        Vous ne devez pas être indemnisé au titre d’une allocation chômage, ou être indemnisé au titre d'une autre allocation dont le montant est inférieur ou égal à celui de l'allocation de retour à l’emploi (ARE) minimale.<br/>
        Dans certaines situations particulières définies localement, une aide à la mobilité peut être attribuée, même si certaines conditions ne sont pas remplies. Cette décision exceptionnelle relève de l’appréciation de votre conseiller et de la validation du directeur d’agence`,
        cumulable: 'non',
        link: 'https://www.pole-emploi.fr/candidat/vos-recherches/les-aides-financieres/recherche-demploi---laide-au-dep.html',
        who: 'demandeur d\'emploi',
        section: 'transport, logement',
        situtation: 'je recherche un emploi',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Aide pour la reprise d\'emploi',
        goal: 'Bénéficiez d\'une prise en charge des frais du premier mois de reprise d\'emploi',
        description: `Frais pris en charge: il s’agit de frais durant le premier mois de reprise (de date à date).<br/>
        Frais de déplacement <br/>
        Frais de repas : forfait de 6 € par jour. Si les frais de repas sont pris en charge par votre employeur, l’aide ne vous sera pas attribuée. <br/>
        Frais d’hébergement : plafond de 30 € par nuitée, dans la limite des frais que vous engagez et sur présentation des justificatifs.`,
        when: 'Votre demande doit être effectuée dès la connaissance de votre embauche et au plus tard dans les 30 jours.',
        conditions: `Le lieu de votre reprise d’emploi doit être situé sur le territoire français et à plus de 60 km aller-retour, ou à 2 heures de trajet aller-retour du lieu de votre domicile (pour l’Outre-mer, la condition est de 20 km aller-retour).<br/>
        L’emploi repris doit concerner soit un contrat à durée indéterminée (CDI), soit un contrat à durée déterminée (CDD) ou un contrat de travail temporaire de 3 mois consécutifs minimum à temps plein ou à temps partiel.`,
        cumulable: 'non',
        link: 'https://www.pole-emploi.fr/candidat/vos-recherches/les-aides-financieres/reprise-demploi---laide-au-depla.html',
        who: 'demandeur d\'emploi avec promesse d\'embauche',
        section: 'logement, transport',
        situtation: 'j\'emménage, je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Ma nouvelle ville',
        goal: 'Bénéficiez d\'un accompagnement sur mesure par un conseiller dédié à la mobilité',
        description: 'Mise en relation avec un conseiller, afin de proposer un accompagnement sur mesure pour: trouver un logement, réaliser les formalités amdinistratives de départ ou d\'arrivée, rechercher des écoles pour les enfants, gestion du déménagement, recherche d\'emploi pour le conjoint',
        when: 'Dès connaissance de la mutation ou du projet de mobilité',
        conditions: 'Vous êtes alternant, intérimaire, salarié d’une entreprise et vous allez vivre une mobilité géographique pour raison professionnelle ?',
        cumulable: 'oui',
        link: 'https://www.manouvelleville.fr/demande-de-contact-salarie/',
        who: 'alternant, salarié',
        section: 'accompagnement, logement',
        situtation: 'je déménage, je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Agence pour l\'information sur le logement',
        goal: 'Echangez avec un conseiller spécialisé logement',
        description: 'Les missions des ADIL couvrent notamment : les services au public, le conseil juridique, financier, fiscal mais aussi l\'aide au logement des ménages en difficultés, la présentation de l\'offre de logements disponibles.',
        when: 'A tout moment',
        conditions: 'Aucune',
        cumulable: 'oui',
        link: 'https://www.anil.org/lanil-et-les-adil/votre-adil/',
        who: 'demandeur d\'emploi, salarié, alternant, moins de 26 ans',
        section: 'accompagnement, logement',
        situtation: 'je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Mobilize: Garages solidaires',
        goal: 'Accedez à la location de véhicules neufs ou reparation à prix réduit',
        description: `Des garages du réseau Renault se portent volontaires par conviction pour aider les personnes qui ne peuvent pas assurer financièrement l'usage d'une voiture mais qui en ont besoin pour rechercher, trouver ou conserver un emploi. <br/>
        Ces garages effectuent les mêmes prestations de qualité que pour toute autre personne mais les prix réduits sont préalablement définis pour tenir compte des situations personnelles particulières. `,
        when: 'A tout moment',
        conditions: 'Les offres Mobilize sont accessibles aux personnes : habitant en France métropolitaine, ayant un besoin de mobilité lié au projet professionnel, majeures et titulaires du permis de conduire, éligibles aux conditions de ressources du programme, éventuellement en situation d’incident bancaire (sur étude du dossier)',
        cumulable: 'oui',
        link: 'https://mobilize.groupe.renault.com/',
        who: 'demandeur d\'emploi, salarié, alternant, moins de 26 ans',
        section: 'transport',
        situtation: 'je recherche un emploi',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Réseau SAM',
        goal: 'Sollicitez un service d\'hébergement bénévole au profit des personnes en recherche d\'emploi',
        description: `Vous êtes à la recherche d’un emploi, vous avez un entretien, un concours, une formation et vous devez vous déplacer loin de votre domicile… <br/>
        Le réseau SAM mobilise des bénévoles pour vous accueillir pour des séjours courts: repas, nuit et petit déjeuner.`,
        when: 'Lors d\'un entretien d\'embauche, lors d\'un concours, d\'une formation',
        conditions: '',
        cumulable: 'oui',
        link: 'http://www.reseau-sam.fr/',
        who: 'demandeur d\'emploi, salarié, alternant, moins de 26 ans',
        section: 'logement',
        situtation: 'je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'AL\'IN',
        goal: 'Simplifiez votre recherche de logement social',
        description: 'Une plateforme pour demander un logement social, mais aussi  pour consulter et postuler aux logements disponibles directement',
        when: 'A tout moment',
        conditions: 'Etre salarié',
        cumulable: 'oui',
        link: 'https://www.actionlogement.fr/plateforme-locative/salaries',
        who: 'salarié',
        section: 'logement',
        situtation: 'je déménage, je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Subvention Mobili-pass',
        goal: 'Demandez une subvention pour financer des frais d\'agence ainsi qu\'une assistance pour les démarches administratives',
        description: `La subvention de l'AIDE MOBILI-PASS  permet de financer les frais liés à la prestation d'un professionnel de la mobilité privé librement choisi par vous ou par votre entreprise pour: <br/>
        la recherche de logement (respectant une distance de 70 km entre l'ancienne et la nouvelle résidence ou plus de 1 h 15 entre l'ancienne résidence et le nouveau lieu de travail); <br/>
        l'accompagnement individuel de la famille et la réalisation des démarches administratives pour la mise en service du logement; <br/>
        l'assistance à l'installation dans le logement.`,
        when: 'suite à une embauche, une mutation',
        conditions: 'Etre salarié d’une entreprise du secteur privé non agricole de 10 salariés et plus.',
        cumulable: 'oui',
        link: 'https://www.actionlogement.fr/financement-mobilite',
        who: 'salarié, demandeur d\'emploi avec promesse d\'embauche, aternance, moins de 26 ans',
        section: 'logement, accompagnement',
        situtation: 'je déménage, je recherche un logement',
      },
      true,
    )

    await models.helps.create(
      {
        title: 'Prêt Mobili-pass',
        goal: 'Demandez un prêt à 1% pour financer les frais liés à votre départ',
        description: `Le prêt de l’AIDE MOBILI-PASS,  permet de financer certains des frais annexes liés à la mobilité professionnelle : <br/>
        sur le site de départ (frais d’assistance à la mise en location ou à la vente de mon logement, indemnités de remboursement anticipé de mon prêt immobilier ou des intérêts intercalaires de mon prêt relais),
        sur le site d’arrivée (frais d’agence immobilière ou de notaire dans le cadre de la signature de mon nouveau bail.)`,
        when: 'suite à une embauche, une mutation',
        conditions: 'Etre salarié d’une entreprise du secteur privé non agricole de 10 salariés et plus.',
        cumulable: 'oui',
        link: 'https://www.actionlogement.fr/financement-mobilite',
        who: 'salarié, demandeur d\'emploi avec promesse d\'embauche, aternance, moins de 26 ans',
        section: 'logement, accompagnement',
        situtation: 'je recherche un logement, je déménage',
      },
      true,
    )
    
    await models.helps.create(
      {
        title: 'Changement d\'adresse en ligne',
        goal: 'Déclarez, par internet et en une seule opération, le changement d\'adresse à plusieurs organismes',
        description: `Pour déclarer vos nouvelles coordonnées, simultanément auprès de plusieurs services de l'administration et de fournisseurs d'énergie.<br/>
        Permet d'informer plusieurs organismes publics et privés simultanément : Caisses de sécurité sociale et de retraite, Énergie (EDF, Engie) Pôle emploi, Service des impôts, Services en charge des cartes grises (SIV)`,
        when: 'Dès que votre adresse est connue',
        conditions: 'Se munir de ses identifiants pour chacun des organismes concernés.',
        cumulable: 'oui',
        link: 'https://psl.service-public.fr/mademarche/JeChangeDeCoordonnees/demarche?execution=e2s1',
        who: 'demandeur d\'emploi, salarié, alternant, moins de 26 ans',
        section: 'logement',
        situtation: 'Je déménage',
      },
      true,
    )
    
    await models.helps.create(
      {
        title: 'DossierFacile',
        goal: 'Montez un dossier de location en béton pour trouver le logement de vos rêves',
        description: `DossierFacile vous aide à constituer un dossier de location numérique de qualité pour mettre toutes les chances de votre côté. <br/>
        Transmettez aux propriétaires un dossier clair, complet et cohérent pour maximiser vos chances. Soyez le plus réactif en envoyant en un clic votre dossier numérique. <br/>
        Après une batterie de tests par nos opérateurs, votre dossier est labellisé par l'État. <br/>
        Vos documents sont recouverts de filigranes pour vous protéger contre la fraude de propriétaires peu scrupuleux.`,
        when: 'Dès que vous recherchez un logement',
        conditions: 'Aucune condition',
        cumulable: 'oui',
        link: 'https://dossierfacile.fr/',
        who: 'demandeur d\'emploi, salarié, alternant, moins de 26 ans',
        section: 'dossier logement',
        situtation: 'Je recherche un logement',
      },
      true,
    )

  },
  down: (/*queryInterface , Sequelize*/) => {
  },
}

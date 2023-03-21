import React from 'react'
import styled from 'styled-components'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import GuideStepLayout from './components/GuideStepLayout'
import GuideStepContentTitle from './components/GuideStepContentTitle'
import GuideStepCard from './components/GuideStepCard'

const CheckBoxIcon = styled(CheckBoxOutlineBlankIcon)`
  vertical-align: bottom;
  margin-right: 8px;
  color: #e0e0e0;
`

const CheckListItem = ({ children }) => (
  <p style={{ margin: '16px 0' }}>
    <CheckBoxIcon /> {children}
  </p>
)

const GuideStep5 = () => {

  return (
    <GuideStepLayout
      stepNumber={5}
      stepTitle="Après mon déménagement"
      headerImageSrc="mobility-guide/folder"
    >
      <GuideStepCard
        light
        icon={<ErrorOutlineIcon />}
        title="Important à faire dans les 72h"
        CTAtitle="Je déclare mon changement d'adresse"
        CTAhref="http://plmpl.fr/c/dUSt2"
      >
        <p style={{ width: '100%' }}>
          Si vous restez inscrit chez Pôle emploi, vous devez déclarez votre
          changement d'adresse.
        </p>
      </GuideStepCard>

      <GuideStepCard
        light
        title="Lors de votre prochaine actualisation, que faire en cas de reprise d'activité ?"
        CTAtitle="Je découvre comment déclarer"
        CTAhref="https://www.pole-emploi.fr/candidat/vos-droits-et-demarches/vos-changements-de-situation/declaration-dactivite.html"
      >
        <p style={{ width: '100%' }}>
          Comment déclarer une reprise d'activité salariée ? Retrouvez
          l'ensemble des modalités pratiques et les conséquences de votre
          déclaration.
        </p>
      </GuideStepCard>

      <GuideStepContentTitle>
        La checklist après votre déménagement
      </GuideStepContentTitle>

      <GuideStepCard title="1 mois après">
        <div style={{ width: '100%' }}>
          <CheckListItem>Résilier/transférer mes abonnements</CheckListItem>
          <CheckListItem>
            Contacter les organismes administratifs cartes grises, liste
            électorales en mairie, mutuelle
          </CheckListItem>
          <CheckListItem>
            Contacter les services publics :<br />
            Impôts, Pôle emploi, Caisse de sécurité sociale, CAF, CPAM, caisse
            de retraite, Caisse des dépôts
          </CheckListItem>
        </div>
      </GuideStepCard>

      <GuideStepCard title="Dans les mois qui suivent">
        <div style={{ width: '100%' }}>
          <CheckListItem>
            Vérifier l'arrêt des prélèvements des contrats résilisés
          </CheckListItem>
          <CheckListItem>
            Prévenir l'expéditeur dès que je reçois du courrier encore transféré
            par la Poste
          </CheckListItem>
        </div>
      </GuideStepCard>
    </GuideStepLayout>
  )
}

GuideStep5.propTypes = {}

export default GuideStep5

import React, { useState } from 'react'
import styled from 'styled-components'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { COLOR_PRIMARY } from '../../constants/colors'
import { ActionButton } from '../../components'
import GuideStepLayout from './components/GuideStepLayout'
import GuideStepContentTitle from './components/GuideStepContentTitle'
import GuideStepCard from './components/GuideStepCard'

const CardSubTitle = styled.p`
  color: ${COLOR_PRIMARY};
  font-size: 16px;
  font-weight: bold;
`

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

const GuideStep4 = () => {
  const isMobile = isMobileView(useWindowSize())

  const [expandedCard, setExpandedCard] = useState(0)

  const toggleCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id))
  }

  return (
    <GuideStepLayout
      stepNumber={4}
      stepTitle="Préparez votre déménagement"
      stepCTA={
        <ActionButton
          libelle="Je télécharge la checklist au format pdf"
          path="/pdf/demenagement-checklist.pdf"
        />
      }
      headerImageSrc="mobility-guide/hands_give"
    >
      <GuideStepContentTitle>
        La checklist pour votre déménagement
      </GuideStepContentTitle>

      <GuideStepCard
        title="Dès que possible"
        mobileFoldable
        isExpanded={expandedCard === 0}
        onClick={() => toggleCard(0)}
      >
        <div style={{ width: '100%' }}>
          <CheckListItem>
            Lettre de préavis (bailleur ou co-propriété)
          </CheckListItem>
          <CheckListItem>
            Chercher les écoles, crèches, et/ou nourrices proche du futur
            domicile
          </CheckListItem>
        </div>
      </GuideStepCard>

      <GuideStepCard
        title="3 mois avant"
        mobileFoldable
        isExpanded={expandedCard === 1}
        onClick={() => toggleCard(1)}
      >
        <div style={{ width: '100%' }}>
          <CheckListItem>
            Faire le tri et désencombrer les affaires à vendre, donner ou jeter
          </CheckListItem>
          <CheckListItem>Budgétiser mon déménagement</CheckListItem>
          <CheckListItem>
            Vérifier les restrictions de stationnement et faire une demande
            d'autorisation de stationnement
          </CheckListItem>
        </div>
      </GuideStepCard>

      <GuideStepCard
        title="1 mois avant"
        mobileFoldable
        isExpanded={expandedCard === 2}
        onClick={() => toggleCard(2)}
      >
        <div style={{ width: '100%' }}>
          <CheckListItem>
            Mettre le compteur d'électricité à mon nom
          </CheckListItem>
          <CheckListItem>
            Récupérer le numéro de l'ancien occupant
          </CheckListItem>
          <CheckListItem>Souscrire un nouvel abonnement internet</CheckListItem>
          <CheckListItem>Vérifier la couverture réseau mobile</CheckListItem>
          <CheckListItem>Contacter le service public des eaux</CheckListItem>
          <CheckListItem>
            Souscrire un nouveau contrat d'assurance habitation
          </CheckListItem>
        </div>
      </GuideStepCard>

      <GuideStepCard
        title="2 semaines avant"
        mobileFoldable
        isExpanded={expandedCard === 3}
        onClick={() => toggleCard(3)}
      >
        <div style={{ width: '100%' }}>
          <CardSubTitle>Communiquer mon changement d'adresse à</CardSubTitle>
          <CheckListItem>Ma banque</CheckListItem>
          <CheckListItem>Mon employeur</CheckListItem>
          <CheckListItem>La poste pour transfert de mon courrier</CheckListItem>
        </div>
      </GuideStepCard>

      <GuideStepCard
        title="Jour du déménagement"
        mobileFoldable
        isExpanded={expandedCard === 4}
        onClick={() => toggleCard(4)}
      >
        <div style={{ width: '100%' }}>
          <CheckListItem>Etat des lieux de sortie et d'entrée</CheckListItem>
          <CheckListItem>
            Relevés des compteurs ancien et nouveau logement
          </CheckListItem>
          <CheckListItem>La poste pour transfert de mon courrier</CheckListItem>
          <CheckListItem>
            Je confirme à mon assureur la fin du contrat
          </CheckListItem>
          <CheckListItem>
            Préparer la caisse à outils le jour J (tournevis, clés à molette,
            pince multi-prise...)
          </CheckListItem>
        </div>
      </GuideStepCard>

      { isMobile ? null : <ActionButton
        libelle="Je télécharge la checklist au format pdf"
        path="/pdf/demenagement-checklist.pdf"
        centered
      />}
    </GuideStepLayout>
  )
}

GuideStep4.propTypes = {}

export default GuideStep4

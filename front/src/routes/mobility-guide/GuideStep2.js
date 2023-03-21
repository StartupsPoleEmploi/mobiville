import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as LightBulbIcon } from '../../assets/images/icons/light_bulb.svg'
import { ReactComponent as CrowdIcon } from '../../assets/images/icons/crowd.svg'

import { COLOR_PRIMARY } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { Image, ActionButton } from '../../components'
import GuideStepLayout from './components/GuideStepLayout'
import GuideStepContentTitle from './components/GuideStepContentTitle'
import GuideStepCard from './components/GuideStepCard'
import AccordionPane from './components/AccordionPane'

const CenteredCardsContainer = styled.div`
  display: flex;
  flex-direction: ${({ $isMobile }) => $isMobile ? 'column' : 'row'};
  gap: 16px;
`

const CenteredCard = styled.div`
  flex: 1;
  padding: 48px 16px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
  -webkit-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
  -moz-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
`

const CenteredCardTitle = styled.div`
  text-align: center;
  color: ${COLOR_PRIMARY};
  font-size: 18px;
  font-weight: 700;
`

const GuideStep2 = () => {
  const isMobile = isMobileView(useWindowSize())

  const [openedPane, setOpenedPane] = useState(0)

  const togglePane = (paneId) => {
    setOpenedPane((prev) => (prev === paneId ? null : paneId))
  }

  return (
    <GuideStepLayout
      stepNumber={2}
      stepTitle="Je postule dans la ville qui me correspond"
      headerImageSrc="mobility-guide/todo_list"
    >
      <GuideStepContentTitle>
        Les outils pour vous aider à postuler
      </GuideStepContentTitle>

      <AccordionPane
        title="Préparons votre candidature"
        isOpened={openedPane === 0}
        onClick={() => togglePane(0)}
      >
        <GuideStepCard
          title="Je rédige ou met à jour mon CV et ma lettre de motivation"
          CTAtitle="Je découvre les services"
          CTAhref="https://www.emploi-store.fr/portail/thematiques/preparerSaCandidature/cvEtLettreDeMotivation"
        >
          <p>
            Le CV et la lettre de motivation constitue bien souvent la première
            image que le recruteur se fait du candidat, alors il ne faut pas les
            négliger !
          </p>
          <Image src="mobility-guide/step2/emploi-store-preparer-candidature" />
        </GuideStepCard>

        <GuideStepCard
          title="Je crée, modifie ou publie mon profil de compétences dans mon espace personnel"
          CTAtitle="Je complète et personnalise mon profil"
          CTAhref="https://www.emploi-store.fr/portail/services/profilDeCompetence"
        >
          <p>
            En plus du CV, votre profil de compétences vous permet de valoriser
            l'ensemble de vos compétences (savoir-faire, savoirs et savoir-être)
            auprès des recruteurs. Pour donner envie aux recruteurs de vous
            contacter, lors de leur recherche de candidats sur pole-emploi.fr.
          </p>
          <Image src="mobility-guide/step2/emploi-store-profil-de-competences" />
        </GuideStepCard>
      </AccordionPane>

      <AccordionPane
        title="Je postule aux offres d'emploi"
        isOpened={openedPane === 1}
        onClick={() => togglePane(1)}
      >
        <GuideStepCard
          title="Découvrez toutes les offres d'emploi"
          CTAtitle="Je découvre les offres d'emploi"
          CTAhref="/"
        >
          <p>
            Consultez nos offres et postuler en ligne dans la ville que vous
            avez sélectionné
          </p>
          <Image src="mobility-guide/step2/mobiville-offres" />
        </GuideStepCard>

        <GuideStepCard
          title="Participez aux rencontres professionnelles de la région"
          CTAtitle="Je découvre le service Mes événements emploi"
          CTAhref="https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements"
        >
          <p>
            Consultez le calendrier des rencontres professionnelles dans la
            ville qui correspond à votre projet !
          </p>
          <Image src="mobility-guide/step2/mes-evenements-emploi" />
        </GuideStepCard>

        <GuideStepCard
          title="Démarchez les entreprises de façon spontanée"
          CTAtitle="Je découvre le service La Bonne Boîte"
          CTAhref="https://labonneboite.pole-emploi.fr/"
        >
          <p>
            Consultez les entreprises qui recrutent dans la région et envoyez
            des candidatures spontanées
          </p>
          <Image src="mobility-guide/step2/la-bonne-boite" />
        </GuideStepCard>

        <GuideStepCard
          light
          title="Astuce"
          icon={<LightBulbIcon />}
          CTAtitle="Je découvre le tutoriel"
          CTAhref="https://www.pole-emploi.fr/candidat/vos-services-en-ligne/les-pas-a-pas-les-videos-qui-vou/comment-sabonner-aux-offres-demp.html"
        >
          <ul>
            <li>Pensez à vous abonner aux offres Pôle emploi</li>
          </ul>
        </GuideStepCard>
      </AccordionPane>

      <AccordionPane
        title="Mon entretien avec un recruteur"
        isOpened={openedPane === 2}
        onClick={() => togglePane(2)}
      >
        <GuideStepCard
          title="Je prépare mon entretien"
          CTAtitle="Je découvre les services"
          CTAhref="https://www.emploi-store.fr/portail/parcours-conseils/rechercheEmploiMaintenant/preparer-entretien"
        >
          <p>
            Vous souhaitez mieux préparer vos entretiens pour vos futures
            missions ?<br />
            Mettez toutes les chances de votre côté en utilisant les services
            proposés par Pôle emploi
          </p>
          <Image src="mobility-guide/step2/emploi-store-preparer-entretien" />
        </GuideStepCard>

        <GuideStepCard
          title="Je m'entraîne pour mon entretien"
          CTAtitle="J'accède au simulateur d'entretien"
          CTAhref="https://pitchboy.app/pole-emploi"
        >
          <p>
            Entraînez-vous à présenter vos compétences transversales grâce à une
            simulation de conversation.
          </p>
          <Image src="mobility-guide/step2/pitchboy_logo" />
        </GuideStepCard>

        <GuideStepCard
          title="Bénéficiez d'une prise en charge des frais de déplacement"
          CTAtitle="Je fais la demande d'aide pour la recherche d'emploi"
          CTAhref="/aides/aide-pour-la-reprise-demploi"
        >
          <p>
            Faites prendre en charge vos frais lors d'un déplacement pour un
            entretien d'embauche
          </p>
          <img
            src="/help-logos/100px/pole-emploi.png"
            alt=""
            srcSet={`/help-logos/120px/pole-emploi.png 1x,
                     /help-logos/240px/pole-emploi.png 2x,`}
          />
        </GuideStepCard>
      </AccordionPane>

      <GuideStepContentTitle style={{ marginTop: 48 }}>Un coup de pouce ?</GuideStepContentTitle>

      <GuideStepCard
        light
        title="Découvrez les ateliers-conseils"
        icon={<CrowdIcon />}
        CTAtitle="Je découvre les ateliers conseils"
        CTAhref="https://messervices.pole-emploi.fr/catalogue-services"
      >
        <p>
          Pôle emploi vous propose des ateliers pour vous aider à préparer votre
          candidature et trouver un emploi. Vous pouvez vous inscrire en ligne
          via votre espace personnel.
        </p>
      </GuideStepCard>

      <CenteredCardsContainer $isMobile={isMobile}>
        <CenteredCard>
          <CenteredCardTitle>Vous êtes<br />Demandeur d'emploi</CenteredCardTitle>
          <ActionButton libelle="Je prends RDV avec mon conseiller" path="https://candidat.pole-emploi.fr/candidat/espacepersonnel" />
          <Link to="https://www.pole-emploi.fr/candidat/vos-services-en-ligne/les-pas-a-pas-les-videos-qui-vou/comment-contacter-mon-conseiller.html">Comment prendre RDV ?</Link>
        </CenteredCard>

        <CenteredCard>
          <CenteredCardTitle>Vous êtes<br />Salarié</CenteredCardTitle>
          <ActionButton libelle="Je trouve une agence Pôle emploi" path="https://www.pole-emploi.fr/annuaire/votre-pole-emploi.html" />
          <p>Rendez-vous directement en agence Pôle Emploi</p>
        </CenteredCard>
      </CenteredCardsContainer>
    </GuideStepLayout>
  )
}

GuideStep2.propTypes = {}

export default GuideStep2

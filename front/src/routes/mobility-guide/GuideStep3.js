import React from 'react'

import { ReactComponent as LightBulbIcon } from '../../assets/images/icons/light_bulb.svg'
import { ActionButton } from '../../components'
import GuideStepLayout from './components/GuideStepLayout'
import GuideStepContentTitle from './components/GuideStepContentTitle'
import GuideStepCard from './components/GuideStepCard'
import LinkCTA from './components/LinkCTA'

const GuideStep3 = () => {

  return (
    <GuideStepLayout
      stepNumber={3}
      stepTitle="Je suis embauché(e) et recherche un logement"
      headerImageSrc="mobility-guide/kid_fresh_air"
    >
      <GuideStepContentTitle>
        Pensez à mobiliser les aides pour faciliter votre accès au logement
        (soumises à éligibilité)
      </GuideStepContentTitle>

      <GuideStepCard
        mobileReverse
        title="Je mobilise un conseiller logement Action Logement"
        CTAtitle="Je découvre l'aide"
        CTAhref="/aides/louer-pour-l-emploi"
      >
        <p>
          Locataire, vous déménagez suite à une nouvelle opportunité
          professionnelle ? Action Logement facilite votre accès au logement
          dans le parc privé en vous proposant de bénéficier de services
          gratuits : loyers plafonnés, caution gratuite, avance sans frais de
          votre dépôt de garantie. Un expert Action logemennt vous accompagne et
          vous conseille dans votre recherche.
        </p>
        <img src="/help-logos/240px/action-logement-2.png" alt="" />
      </GuideStepCard>

      <GuideStepCard
        mobileReverse
        title="Je constitue un dossier de location"
        CTAtitle="Je découvre l'aide"
        CTAhref="/aides/dossier-facile"
      >
        <p>
          Montez un dossier de location en béton pour trouver le logement de vos
          rêves. DossierFacile vous aide à constituer un dossier de location
          numérique de qualité pour mettre toutes les chances de votre côté.
        </p>
        <img src="/help-logos/100px/dossier-facile.png" alt="" />
      </GuideStepCard>

      <GuideStepCard
        mobileReverse
        title="Je trouve un logement avec Action Logement"
        CTAtitle="Je postule aux offres de logement social"
        CTAhref="/aides/alin"
      >
        <div>
          <p>
            Accédez à l'offre de logement temporaire meublé pour vous loger
            rapidement partout en France.
          </p>
          <LinkCTA href="/aides/logement-temporaire">Un logement temporaire</LinkCTA>
          <p style={{ marginTop: 16 }}>Découvrez AL'in.fr la plateforme d'offres de logement.</p>
        </div>
        <img src="/help-logos/240px/action-logement-2.png" alt="" />
      </GuideStepCard>

      <GuideStepCard light title="Astuce" icon={<LightBulbIcon />}>
        <p>
          Elargissez vos recherches dans le parc privé en contactant les agences
          immobilière du secteur choisi
        </p>
      </GuideStepCard>

      <ActionButton
        libelle="Je découvre toutes les aides à la mobilité"
        path="/aides"
        isWhite
        isBlue={false}
        centered
        style={{ marginTop: 48 }}
      />
    </GuideStepLayout>
  )
}

GuideStep3.propTypes = {}

export default GuideStep3

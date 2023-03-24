import React from 'react'
import styled from 'styled-components'

import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { Image } from '../../components'
import GuideStepLayout from './components/GuideStepLayout'
import StepNumber from './components/StepNumber'
import GuideStepContentTitle from './components/GuideStepContentTitle'
import { useDevice } from '../../common/contexts'

const GuideStepContentText = styled.p`
  font-size: 16px;
`

const GuideStepContentItalic = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
`

const StepContainer = styled.div`
  margin: 96px 0;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const StepText = styled.div`
  padding: 0 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 16px;
`

const TextCTA = styled.p`
  color: ${COLOR_PRIMARY};
  font-weight: 700;
  font-size: 18px;
  text-align: center;
`

const TextCTAMobile = styled(TextCTA)`
  color: ${COLOR_TEXT_PRIMARY};
`

const List = styled.ol`
  padding: 16px;
  color: ${COLOR_TEXT_PRIMARY};
`

const ListItem = styled.li`
  padding: 8px 0;

  &::marker {
    font-weight: 700;
  }
`

const GuideStep1 = () => {
  const { isMobile } = useDevice()

  return (
    <GuideStepLayout
      fullWidth
      stepNumber={1}
      stepTitle="J'identifie le territoire le plus favorable pour retrouver un emploi"
      headerImageSrc="mobility-guide/phone"
    >
      <GuideStepContentTitle>
        Comment choisir une ville sur Mobiville ?
      </GuideStepContentTitle>
      <GuideStepContentText>
        Grâce à Mobiville, vous allez pouvoir pour chaque territoire découvrir
        les opportunités d'emploi, obtenir des informations sur le logement et
        les services de la ville.
      </GuideStepContentText>
      <GuideStepContentItalic>
        Le service se base sur des données provenant de Pole emploi, des
        collectivités et des partenaires.
      </GuideStepContentItalic>

      {isMobile ? (<>
        {/* MOBILE */}
        <List>
          <ListItem>Faites une recherche de ville</ListItem>
          <ListItem>Sélectionnez votre métier</ListItem>
          <ListItem>Sélectionnez une région parmi celles qui vous sont proposées</ListItem>
          <ListItem>
            Renseignez vos critères de recherche pour affiner votre recherche :
            environnement, taille de ville
          </ListItem>
          <ListItem>Faites votre choix parmi les villes qui vous sont proposées</ListItem>
          <ListItem>Découvrez la ville : emploi, logement, cadre de vie</ListItem>
        </List>

        <TextCTAMobile>J'ai trouvé la ville dans laquelle je me projette !</TextCTAMobile>
      </>) : (
        <>
          {/* DESKTOP */}
          <StepContainer>
            <StepText>
              <StepNumber number={1} />
              <p>
                Sélectionnez votre métier puis renseignez directement une ville
                si vous avez déjà une idée ou bien si vous n'avez pas d'idée
                choisissez une région attractive pour ce métier parmi celles qui
                vous sont proposées.
              </p>
            </StepText>
            <Image src="mobility-guide/step1/mobiville-home" />
          </StepContainer>

          <StepContainer>
            <Image src="mobility-guide/step1/mobiville-villes" />
            <StepText>
              <StepNumber number={2} />
              <p>
                Faites votre choix parmi les villes qui suggerées, vous pourrez
                comparer les opportunités d'emploi ainsi que le nombre d'offres
                dans chaque ville. Vous pourrez affiner votre recherche en
                fonction de différents critères comme le cadre de vie : mer,
                montagne, campagne ou bien la taille de ville.
              </p>
            </StepText>
          </StepContainer>

          <StepContainer>
            <StepText>
              <StepNumber number={3} />
              <p>
                A présent découvrez les informations sur la ville de votre choix
                : les offres d'emploi, entreprises et secteurs qui recrute le
                plus. Les données logements ou encore les services de la ville.
              </p>
            </StepText>
            <Image src="mobility-guide/step1/mobiville-ville" />
          </StepContainer>

          <TextCTA>
            J'ai trouvé la ville dans laquelle je me projette ! <br />
            Maintenant je postule
          </TextCTA>
        </>
      )}

    </GuideStepLayout>
  )
}

GuideStep1.propTypes = {}

export default GuideStep1

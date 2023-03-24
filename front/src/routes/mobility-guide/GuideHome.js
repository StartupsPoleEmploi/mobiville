import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { COLOR_WHITE, COLOR_PRIMARY } from '../../constants/colors'
import { MainLayout, Breadcrumbs, Section, Image } from '../../components'
import StepNumber from './components/StepNumber'
import { useDevice } from '../../common/contexts'

const Title = styled.h1`
  margin: 24px 0 0 0;

  font-size: 36px;
  font-weight: 900;
  color: ${COLOR_PRIMARY};
`

const SubTitle = styled.p`
  margin: 0;

  font-size: 18px;
`

const CardContainer = styled.div`
  margin: ${({ $isMobile }) => ($isMobile ? '16px' : '32px')};

  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Card = styled(Link)`
  width: 100%;
  max-width: 581px;
  padding: ${({ $isMobile }) => ($isMobile ? '24px' : '60px 24px')};

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  gap: 16px;

  border-radius: 4px;
  background-color: ${COLOR_WHITE};

  &:hover {
    box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
  }
`

const CardText = styled.div`
  width: 100%;
`

const CardTitle = styled.h2`
  margin: 0;

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: bold;
  line-height: 36px;
`

const CardSubTitle = styled.p`
  margin: 0;

  font-size: 18px;
`

const CardTrackerContainer = styled.div`
  position: relative;
  border: 1px dashed ${COLOR_PRIMARY};
  margin-right: 30px;
`

const CardTracker = ({ number }) => (
  <CardTrackerContainer>
    <StepNumber inTracker number={number} />
  </CardTrackerContainer>
)

const GuideHome = () => {
  const { isMobile } = useDevice()

  return (
    <MainLayout topMobileMenu>
      <Section>
        {isMobile ? null : (
          <Breadcrumbs
            breadcrumbs={[
              { text: 'Accueil', link: '/' },
              { text: 'Conseils et astuces' },
            ]}
          />
        )}
        <Title>Conseils et astuces sur la mobilité</Title>
        <SubTitle>
          Tous nos conseils et astuces pour organiser votre projet de mobilité.
        </SubTitle>
      </Section>

      <CardContainer $isMobile={isMobile}>
        {isMobile ? null : <CardTracker number={1} />}
        <Card $isMobile={isMobile} to="etape-1">
          {isMobile ? <StepNumber number={1} /> : null}
          <Image src="mobility-guide/phone-mobile" />
          <CardText>
            <CardTitle>
              J'identifie le territoire le plus favorable pour retrouver un
              emploi
            </CardTitle>
            <CardSubTitle>
              Comment choisir une ville avec le service Mobiville.
            </CardSubTitle>
          </CardText>
        </Card>
      </CardContainer>

      <CardContainer $isMobile={isMobile}>
        {isMobile ? null : <CardTracker number={2} />}
        <Card $isMobile={isMobile} to="etape-2">
          {isMobile ? <StepNumber number={2} /> : null}
          <Image src="mobility-guide/todo_list-mobile" />
          <CardText>
            <CardTitle>Je postule dans la ville qui me correspond</CardTitle>
            <CardSubTitle>
              Préparez vos candidatures, postulez et préparez vos entretiens.
            </CardSubTitle>
          </CardText>
        </Card>
      </CardContainer>

      <CardContainer $isMobile={isMobile}>
        {isMobile ? null : <CardTracker number={3} />}
        <Card $isMobile={isMobile} to="etape-3">
          {isMobile ? <StepNumber number={3} /> : null}
          <Image src="mobility-guide/kid_fresh_air-mobile" />
          <CardText>
            <CardTitle>
              Je suis embauché(e) et je recherche un logement
            </CardTitle>
            <CardSubTitle>
              Bénéficiez d'un accompagnement pour trouver un logement !
            </CardSubTitle>
          </CardText>
        </Card>
      </CardContainer>

      <CardContainer $isMobile={isMobile}>
        {isMobile ? null : <CardTracker number={4} />}
        <Card $isMobile={isMobile} to="etape-4">
          {isMobile ? <StepNumber number={4} /> : null}
          <Image src="mobility-guide/hands_give-mobile" />
          <CardText>
            <CardTitle>Je prépare mon déménagement</CardTitle>
            <CardSubTitle>
              Identifiez toutes les étapes d'un déménagement réussi !
            </CardSubTitle>
          </CardText>
        </Card>
      </CardContainer>

      <CardContainer $isMobile={isMobile}>
        {isMobile ? null : <CardTracker number={5} />}
        <Card $isMobile={isMobile} to="etape-5">
          {isMobile ? <StepNumber number={5} /> : null}
          <Image src="mobility-guide/folder-mobile" />
          <CardText>
            <CardTitle>J'ai déménagé</CardTitle>
            <CardSubTitle>
              Découvrez les incontournables à faire après votre déménagement
            </CardSubTitle>
          </CardText>
        </Card>
      </CardContainer>
    </MainLayout>
  )
}

GuideHome.propTypes = {}

export default GuideHome

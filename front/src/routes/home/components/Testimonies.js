import styled from 'styled-components'
import loadable from '@loadable/component'

import { Image, Section, SectionTitle } from '../../../components'
import {
  COLOR_PRIMARY,
  COLOR_SALMON,
  COLOR_WHITE,
} from '../../../constants/colors'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'

const AppCarousel = loadable(() => import('../../../components/AppCarousel'))

const Container = styled.div`
  width: 100%;
  margin: ${({ isMobile }) => (isMobile ? '0 0 130px 0' : 'auto')};
  position: relative;

  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  align-items: stretch;

  color: ${COLOR_PRIMARY};
`

const ImageContainer = styled.div`
  position: absolute;
  width: ${({ isMobile }) => (isMobile ? '100%' : '0')};
  z-index: 10;
  float: right;
  right: ${({ isMobile }) => (isMobile ? '' : '0px')};
  bottom: ${({ isMobile }) => (isMobile ? '-180px' : '')};

  display: flex;
  justify-content: center;

  pointer-events: none;

  img {
    height: 320px;
    margin: 0 auto;
    pointer-events: none;
  }
`

const TestimonyContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  text-align: left;
  padding: ${({ isMobile }) => (isMobile ? '20px 20px 0 20px' : '0')};
`

const TestimonyHeaderContainer = styled.div`
  min-width: ${({ isMobile }) => (isMobile ? '' : '315px')};
  min-height: ${({ isMobile }) => (isMobile ? '' : '315px')};
  background: ${COLOR_SALMON};
  border-radius: ${({ isMobile }) =>
    isMobile ? '8px 8px 0 0' : '4px 0 0 4px'};
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const TestimonyHeader = styled.div`
  min-width: 200px;
`

const TestimonyTitle = styled.p`
  line-height: 33px;
  font-size: 24px;
  font-weight: 700;
  margin: 0;

  display-box: content;
`

const TestimonyJob = styled(TestimonyTitle)`
  font-weight: 900;
  line-height: 21px;
  padding: 6px 0;
`

const TestimonyDescription = styled.p`
  margin: 0;

  font-size: 18px;
  line-height: 24px;
`

const TestimonyBody = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 13px;
  padding-bottom: ${({ isMobile }) => (isMobile ? '120px' : '20px')};
  border-radius: ${({ isMobile }) =>
    isMobile ? '0 0 8px 8px' : '0 4px 4px 0'};

  background: ${COLOR_WHITE};
  font-style: italic;

  p {
    width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};

    font-size: 18px;
  }
`

const Testimonies = () => {
  const windowsSize = useWindowSize()
  const isMobile = isMobileView(windowsSize)

  return (
    <div style={{ overflow: 'hidden' }}>
      <Section>
        <SectionTitle>
          Ils ont utilisé ont déménagé, ils témoignent
        </SectionTitle>
        <Container isMobile={isMobile}>
          <AppCarousel>
            {/* Testimony 1 */}
            <TestimonyContainer isMobile={isMobile}>
              <TestimonyHeaderContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Jonathan</TestimonyTitle>
                  <TestimonyJob>Conseiller technique</TestimonyJob>
                  <TestimonyDescription>
                    A déménagé à Rodez
                    <br />
                    Utilisation du service en avril
                    <br />
                    Déménagement en août
                  </TestimonyDescription>
                </TestimonyHeader>
              </TestimonyHeaderContainer>
              <TestimonyBody isMobile={isMobile}>
                <p>
                  “Faire une recherche de logement ou d’emploi dans une
                  région/département qu’on ne connaît pas peut s’avérer
                  difficile.
                </p>
                <p>
                  <strong>
                    Mobiville m'a permis d'avoir toutes les infos pour lancer
                    mon projet.
                  </strong>
                </p>
                <p>
                  Lorsque j'ai obtenu ma promesse d'embauche, j'ai bénéficié
                  d'un conseiller logement dédié et j’ai déménagé sereinement.”
                </p>
              </TestimonyBody>
            </TestimonyContainer>

            {/* Testimony 2 */}
            <TestimonyContainer isMobile={isMobile}>
              <TestimonyHeaderContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Lucy</TestimonyTitle>
                  <TestimonyJob>Aide médico psychologique</TestimonyJob>
                  <TestimonyDescription>
                    A déménagé avec son mari
                    <br />à Toulouse
                    <br />
                    Utilisation du service en mai
                    <br />
                    Déménagement en juillet
                  </TestimonyDescription>
                </TestimonyHeader>
              </TestimonyHeaderContainer>
              <TestimonyBody isMobile={isMobile}>
                <p>
                  “J'avais déjà identifié la ville de Toulouse pour mon projet
                  de mobilité, mais en la voyant s'afficher sur Mobiville, j'ai
                  relancé mes démarches.
                </p>
                <p>
                  <strong>
                    J'ai pu sollicité une aide pour trouver un logement et
                    voilà, j'ai déménagé!”
                  </strong>
                </p>
              </TestimonyBody>
            </TestimonyContainer>

            {/* Testimony 3 */}
            <TestimonyContainer isMobile={isMobile}>
              <TestimonyHeaderContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Greg</TestimonyTitle>
                  <TestimonyJob>
                    Technicien de
                    <br />
                    maintenance informatique
                  </TestimonyJob>
                  <TestimonyDescription>
                    A déménagé à Chambéry
                    <br />
                    Utilisation du service en mars
                    <br />
                    Déménagement en juin
                  </TestimonyDescription>
                </TestimonyHeader>
              </TestimonyHeaderContainer>
              <TestimonyBody isMobile={isMobile}>
                <p>
                  “Mobiville est une plateforme rassurante pour se lancer dans
                  un nouveau projet professionnel et très intuitive.
                </p>
                <p>
                  C’est vraiment une évolution géniale! Le site est
                  complémentaire à celui de Pôle emploi. Je dirais même que ça
                  le rajeunit, ça le booste.
                </p>
                <p>
                  <strong>
                    Mobiville est un réel plus qui correspond à la réalité”
                  </strong>
                </p>
              </TestimonyBody>
            </TestimonyContainer>
          </AppCarousel>
          <ImageContainer isMobile={isMobile}>
            <Image src="moving-illustration" />
          </ImageContainer>
        </Container>
      </Section>
    </div>
  )
}

export default Testimonies

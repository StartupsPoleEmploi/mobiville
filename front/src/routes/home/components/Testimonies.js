import styled from 'styled-components'

import { AppCarousel, Section, SectionTitle } from "../../../components"
import { COLOR_PRIMARY, COLOR_SALMON, COLOR_WHITE } from "../../../constants/colors"
import movingIllustration from '../../../assets/images/moving-illustration.png'
import { useWindowSize } from "../../../common/hooks/window-size"
import { isMobileView } from "../../../constants/mobile"

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

const TestimonyHeader = styled.div`
  width: ${({ isMobile }) => (isMobile ? '' : '300px')};
  background: ${COLOR_SALMON};
  border-radius: ${({ isMobile }) => (isMobile ? '4px 4px 0 0' : '4px 0 0 4px')};
  padding: 49px;
`

const TestimonyTitle = styled.p`
  line-height: 33px;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`

const TestimonyBody = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 13px;
  padding-bottom: ${({ isMobile }) => (isMobile ? '120px' : '0')};
  border-radius: ${({ isMobile }) => (isMobile ? '0 0 4px 4px' : '0 4px 4px 0')};

  background: ${COLOR_WHITE};
  font-style: italic;

  p {
    width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
  }
`

const Testimonies = () => {
    const windowsSize = useWindowSize()
    const isMobile = isMobileView(windowsSize)

    return (
      <div style={{ overflow: 'hidden' }}>
        <Section>
          <SectionTitle>Ils ont déménagé, ils témoignent</SectionTitle>
          <Container isMobile={isMobile}>
            <AppCarousel>

              {/* Testimony 1 */}
              <TestimonyContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Jonathan</TestimonyTitle>
                  <TestimonyTitle>Conseiller technique</TestimonyTitle>
                  <p>
                    A déménagé à Rodez<br />
                    Utilisation du service en avril<br />
                    Déménagement en août
                  </p>
                </TestimonyHeader>
                <TestimonyBody isMobile={isMobile}>
                  <p>“Faire une recherche de logement ou d’emploi dans une région/département qu’on ne connaît pas peut s’avérer difficile.</p>
                  <p><strong>Mobiville m'a permis d'avoir toutes les infos pour lancer mon projet.</strong></p>
                  <p>Lorsque j'ai obtenu ma promesse d'embauche, j'ai bénéficié d'un conseiller logement dédié et j’ai déménagé sereinement.”</p>
                </TestimonyBody>
              </TestimonyContainer>

              {/* Testimony 2 */}
              <TestimonyContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Lucy</TestimonyTitle>
                  <TestimonyTitle>Aide médico psychologique</TestimonyTitle>
                  <p>
                    A déménagé avec son mari à Toulouse<br />
                    Utilisation du service en mai<br />
                    Déménagement en juillet
                  </p>
                </TestimonyHeader>
                <TestimonyBody isMobile={isMobile}>
                  <p>“J'avais déjà identifié la ville de Toulouse pour mon projet de mobilité, mais en la voyant s'afficher sur Mobiville, j'ai relancé mes démarches.</p>
                  <p><strong>J'ai pu sollicité une aide pour trouver un logement et voilà, j'ai déménagé!”</strong></p>
                </TestimonyBody>
              </TestimonyContainer>

              {/* Testimony 3 */}
              <TestimonyContainer isMobile={isMobile}>
                <TestimonyHeader isMobile={isMobile}>
                  <TestimonyTitle>Greg</TestimonyTitle>
                  <TestimonyTitle>Technicien de maintenance informatique</TestimonyTitle>
                  <p>
                    A déménagé à Chambéry<br />
                    Utilisation du service en mars<br />
                    Déménagement en juin
                  </p>
                </TestimonyHeader>
                <TestimonyBody isMobile={isMobile}>
                  <p>“Mobiville est une plateforme rassurante pour se lancer dans un nouveau projet professionnel et très intuitive.</p>
                  <p>C’est vraiment une évolution géniale! Le site est complémentaire à celui de Pôle emploi. Je dirais même que ça le rajeunit, ça le booste.</p>
                  <p><strong>Mobiville est un réel plus qui correspond à la réalité”</strong></p>
                </TestimonyBody>
              </TestimonyContainer>

            </AppCarousel>
            <ImageContainer isMobile={isMobile}>
              <img src={movingIllustration} alt="Déménagement - illustration" />
            </ImageContainer>
          </Container>
        </Section>
      </div>
    )
}

export default Testimonies
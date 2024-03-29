import styled from 'styled-components'
import loadable from '@loadable/component'

import { COLOR_PRIMARY } from '../../../constants/colors'
import { Image, Section } from '../../../components'
import { useDevice } from '../../../common/contexts'

const WelcomeSearchForm = loadable(() => import('./WelcomeSearchForm'))

const Container = styled.section`
  background: linear-gradient(180deg, #ddddea 0%, #c3e9e9 100%);
  padding-bottom: ${({ $isMobile }) => ($isMobile ? '40px' : '50px')};
  border-radius: 0;
`
const WelcomeSection = styled(Section)`
  margin-top: unset;
`
// === TITLE BLOCK ===

const TitleContainer = styled.div`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: start;
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '0')};

  margin-top: ${({ $isMobile }) => ($isMobile ? '0' : '30px')};
`

const TitleWrapper = styled.div`
  flex: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 22px;
`

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: 900;
  color: ${COLOR_PRIMARY};
`

const SubTitle = styled.h2`
  font-weight: 400;
  line-height: 27px;
  margin: 0;
`

const HeroImage = styled(Image)`
  align-self: center;
  img {
    width: 320px;
    height: 256px;
    object-fit: cover;

  }
  padding-right: 8px;
  max-width: 100vw;
`

const Welcome = () => {
  const { isMobile } = useDevice()

  return (
    <Container $isMobile={isMobile}>
      <WelcomeSection>
        <TitleContainer $isMobile={isMobile}>
          <TitleWrapper>
            <Title>Trouvez l’emploi et la ville qui va avec !</Title>
            <SubTitle>
              Décrochez l’emploi dans la ville qui vous correspond
              <br />
              et identifiez les aides pour votre projet de mobilité
            </SubTitle>
          </TitleWrapper>

          <HeroImage src="hero-homepage" role="presentation" />
        </TitleContainer>

        <WelcomeSearchForm></WelcomeSearchForm>
      </WelcomeSection>
    </Container>
  )
}

export default Welcome

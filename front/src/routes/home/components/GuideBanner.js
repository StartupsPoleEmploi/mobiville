import styled from 'styled-components'

import { ActionButton, Image, Section } from '../../../components'
import { COLOR_PRIMARY } from '../../../constants/colors'
import { useDevice } from '../../../common/contexts'

const Container = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;

  padding: ${({ isMobile }) => (isMobile ? '20px' : '60px 20px')};

  background: #c3e9e9;
  border-radius: inherit;
`

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 28px;
  margin-block-start: unset;
  margin-block-end: unset;
  color: ${COLOR_PRIMARY};
`

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-block-start: 5px;
  margin-block-end: unset;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  padding: 32px;
  border-radius: 16px;
`

const GuideBanner = () => {
  const { isMobile } = useDevice()

  return (
    <Section isMobileFullWidth={true} isMobile={isMobile}>
      <Container isMobile={isMobile}>
        <Image src="mobility-guide" />
        <TextContainer>
          <H2 isMobile={isMobile}>Conseils et astuces sur la mobilité</H2>
          <Text isMobile={isMobile}>
            Par où commencer ?... Où aller ?... Comment faire ?...
          </Text>
          <Text>
            Découvrez toutes les étapes pour vous aider à postuler dans la ville
            qui vous correspond et préparer votre déménagement.
          </Text>
          <ActionButton
            path="/conseils-et-astuces"
            libelle="Voir tous nos conseils"
            isMobile={isMobile}
            isBlue={true}
            style={{
              marginTop: 16,
              marginRight: 'auto',
              lineHeight: '21px',
            }}
          />
        </TextContainer>
      </Container>
    </Section>
  )
}

export default GuideBanner

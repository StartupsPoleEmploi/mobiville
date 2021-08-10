import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MainLayout } from '../../components/main-layout'
import {
  COLOR_TEXT_PRIMARY,
  COLOR_PRIMARY,
  COLOR_GRAY,
} from '../../constants/colors'
import STEP1 from '../../assets/images/01-Selectionnez.png'
import STEP2 from '../../assets/images/02-Ajoutez.png'
import STEP3 from '../../assets/images/03-Decouvrez.png'
import STEP4 from '../../assets/images/04-Identifiez.png'
import STEP5 from '../../assets/images/05-Demenagez.png'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const Block = styled.div`
  padding: 64px 0;

  > .wrapper {
    display: flex;
    max-width: 1040px;
    align-items: center;

    > div:first-child {
      margin-right: 64px;
    }
  }

  ${(props) =>
    props.isMobile
      ? `
    > .wrapper {
      flex-direction: column;
      margin-left: 16px;
      margin-right: 16px;
      width: calc(100% - 32px);

      > div:first-child {
        margin-right: 0;
      }
    }  
  `
      : ''}
`

const ImageBlock = styled.div`
  width: 320px;
  height: 320px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) =>
    props.isMobile
      ? `
    width: 256px;
    height: 256px;
    margin-bottom: 16px;  
  `
      : ''}
`

const VideoBlock = styled.video`
  width: 320px;
  height: 320px;
`

const TextBlock = styled.div`
  flex: 1;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${COLOR_TEXT_PRIMARY};

  ${(props) =>
    props.isMobile
      ? `
    font-size: 18px;
  
  `
      : ''}
`

const Description = styled.h3`
  margin: 16px 0 32px 0;
  font-size: 24px;
  font-weight: bold;
  color: ${COLOR_TEXT_PRIMARY};

  ${(props) =>
    props.isMobile
      ? `
    font-size: 14px;
  `
      : ''}
`

const Action = styled(Link)`
  && {
    text-decoration: none;
    color: white;
    background-color: ${COLOR_PRIMARY};
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 48px;
    display: inline-block;
    width: 311px;
    text-align: center;
  }
`

const How = styled.div`
  margin: 64px auto;
  max-width: 688px;
  width: 100%;

  ${(props) =>
    props.isMobile
      ? `
    margin: 32px auto;

    > h1 {
      margin-bottom: 32px;
    }
  `
      : ''}
`

const BlockLine = styled.div`
  display: flex;

  > div:first-child {
    margin-right: 8px;
  }

  > div:last-child {
    margin-left: 8px;
  }

  ${(props) =>
    props.isMobile
      ? `
    margin-bottom: 32px;
    margin-left: 16px;
    margin-right: 16px;
    width: calc(100% - 32px);


    > div:first-child {
      margin-right: 0;
    }

    > div:last-child {
      margin-left: 0;
    }
  `
      : ''}
`

const Panel = styled.div`
  flex: 1;
  text-align: center;
`

const NumberText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`

const DescriptionText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`

const EmptyPanel = styled.div`
  flex: 1;

  ${(props) =>
    props.isMobile
      ? `
    display: none;
  `
      : ''}
`

const HomePage = () => {
  const size = useWindowSize()

  return (
    <MainLayout footer topMobileMenu>
      <Block isMobile={isMobileView(size)}>
        <div className="wrapper">
          {isMobileView(size) && (
            <ImageBlock
              style={{ backgroundImage: 'url(/00-Hero-Homepage.png)' }}
              isMobile={isMobileView(size)}
            />
          )}
          <TextBlock>
            <Title isMobile={isMobileView(size)}>
              Vous souhaitez bouger pour retrouver un emploi ?
            </Title>
            <Description isMobile={isMobileView(size)}>
              Trouver le job dans la ville de vos rêves
            </Description>
            <Action to="/rechercher">Trouver ma ville</Action>
          </TextBlock>
          {!isMobileView(size) && (
            <VideoBlock loop muted autoPlay>
              <source src="/videos/Hero-mobiville-320px.mp4" type="video/mp4" />
            </VideoBlock>
          )}
        </div>
      </Block>

      <Block
        style={{ backgroundColor: COLOR_GRAY }}
        isMobile={isMobileView(size)}
      >
        <div className="wrapper">
          <ImageBlock
            style={{ backgroundImage: 'url(/Generique_Aides.png)' }}
            isMobile={isMobileView(size)}
          />
          <TextBlock>
            <Title isMobile={isMobileView(size)}>
              Vous avez besoin d{"'"}
              aide pour votre projet de mobilité ?
            </Title>
            <Description isMobile={isMobileView(size)}>
              Découvrez les solutions pour accélérer votre projet
            </Description>
            <Action to="/aides">Découvrir les aides</Action>
          </TextBlock>
        </div>
      </Block>

      <How isMobile={isMobileView(size)}>
        <Title style={{ textAlign: 'center' }} isMobile={isMobileView(size)}>
          Comment ça marche ?
        </Title>

        <BlockLine isMobile={isMobileView(size)}>
          <Panel>
            <img src={STEP1} alt="Sélectionnez" />
            <NumberText>1</NumberText>
            <DescriptionText>
              Sélectionnez votre métier parmi la liste proposée
            </DescriptionText>
          </Panel>
          <EmptyPanel isMobile={isMobileView(size)} />
        </BlockLine>

        <BlockLine isMobile={isMobileView(size)}>
          <EmptyPanel isMobile={isMobileView(size)} />
          <Panel>
            <img src={STEP2} alt="Ajoutez" />
            <NumberText>2</NumberText>
            <DescriptionText>
              Ajoutez vos critères professionnels et votre cadre de vie idéal
            </DescriptionText>
          </Panel>
        </BlockLine>

        <BlockLine isMobile={isMobileView(size)}>
          <Panel>
            <img src={STEP3} alt="Découvrez" />
            <NumberText>3</NumberText>
            <DescriptionText>
              Découvrez des villes qui vous correspondent et qui recrutent
            </DescriptionText>
          </Panel>
          <EmptyPanel isMobile={isMobileView(size)} />
        </BlockLine>

        <BlockLine isMobile={isMobileView(size)}>
          <EmptyPanel isMobile={isMobileView(size)} />
          <Panel>
            <img src={STEP4} alt="Identifiez" />
            <NumberText>4</NumberText>
            <DescriptionText>
              Identifiez les aides qui vont faciliter votre projet
            </DescriptionText>
          </Panel>
        </BlockLine>

        <BlockLine isMobile={isMobileView(size)}>
          <Panel>
            <img src={STEP5} alt="Déménagez" />
            <NumberText>5</NumberText>
            <DescriptionText>Déménagez dans votre future ville</DescriptionText>
          </Panel>
          <EmptyPanel isMobile={isMobileView(size)} />
        </BlockLine>
      </How>
    </MainLayout>
  )
}

export default HomePage

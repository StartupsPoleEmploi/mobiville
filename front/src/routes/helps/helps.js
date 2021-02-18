import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { MainLayout } from '../../components/main-layout'
import {
  COLOR_BACKGROUND,
  COLOR_GRAY, COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'

const Title = styled.p`
  color: ${COLOR_TEXT_PRIMARY};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 32px;
`

const SubTitle = styled.p`
  color: ${COLOR_TEXT_PRIMARY};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
`

const Header = styled.div`
  height: 216px; 
  margin-bottom: 32px; 
  background: #C4C4C4;  
`

const Container = styled.div`
  display: flex;
  margin: 0 auto 64px auto;
  padding: 0 16px;
  align-items: flex-start;

  ${(props) => (props.isMobile ? `
    display: block;
    margin: 0 0 64px 0;  
    padding: 0;

    > div {
      width: 100%;
      border-radius: 0;
      box-shadow: none;
      margin-right: 0;
    }
  ` : '')}
`

const CategoryPanel = styled.div`
  width: 424px;
  margin-right: 16px;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px 0 32px 16px;
`

const HelpsPanel = styled.div`
  flex: 1;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 24px 16px 32px 16px;

  ${(props) => (props.isMobile ? `
    padding: 0;
  ` : '')}
`

const CategoryTag = styled.div`
  background: ${COLOR_GRAY};
  border-radius: 8px;
  width: 108px;
  padding: 8px 12px;
  margin-right: 18px;
  display: inline-block;
  margin-bottom: 16px;
  box-sizing: border-box;
  cursor: pointer;
  border: 2px solid ${COLOR_GRAY};

  img {
    display: block;
    margin: 8px auto;
  }

  p {
    color: ${COLOR_TEXT_PRIMARY};
    text-align: center;
    font-weight: 500;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  ${(props) => (props.selected ? `
    border: 2px solid ${COLOR_PRIMARY};

    p {
      color: ${COLOR_PRIMARY};
    }
  ` : '')}
`

const Tag = styled.div`
  background: ${COLOR_GRAY};
  border-radius: 44px;
  padding: 8px;
  margin-right: 8px;
  display: inline-block;
  cursor: pointer;

  p {
    color: ${COLOR_TEXT_PRIMARY};
    font-weight: 500;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  ${(props) => (props.selected ? `
    background: ${COLOR_PRIMARY};

    p {
      color: white;
    }
  ` : '')}
`

const TitleHelps = styled.div`
  margin-top: 0;
  margin-bottom: 16px;

  ${(props) => (props.isMobile ? `
    background-color: ${COLOR_BACKGROUND};
    height: 48px;
    line-height: 48px;
    font-weight: 500;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 0;
  ` : '')}
`

const Item = styled(Link)`
  padding: 20px 0 16px 0;
  border-top: 1px solid ${COLOR_GRAY};
  display: block;

  p {
    margin: 0;
    padding: 0;
  }

  .first-title {
    color: ${COLOR_TEXT_PRIMARY};
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .second-title {
    color: ${COLOR_TEXT_PRIMARY};
    margin-bottom: 8px;
  }

  .tag {
    background: #FFFFFF;
    border: 1px solid ${COLOR_TEXT_SECONDARY};
    color: ${COLOR_TEXT_PRIMARY};
    box-sizing: border-box;
    border-radius: 1000px;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 6px;
    font-size: 12px;
  }

  ${(props) => (props.ismobile === 'true' ? `
    padding: 20px 16px 16px 16px;
    border-top: none;
    border-bottom: 2px solid ${COLOR_BACKGROUND};
  ` : '')}
`

const HelpsPage = () => {
  const { previews, onLoadPreviews } = useHelps()
  const [project, setProject] = useState(null)
  const [situation, setStituation] = useState(null)
  const [list, setList] = useState([])
  const size = useWindowSize()
  const categories = [{
    key: 'emploi',
    icon: '/icons/emploi.svg',
    text: 'Je recherche un emploi'
  }, {
    key: 'logement',
    icon: '/icons/logement.svg',
    text: 'Je recherche un logement'
  }, {
    key: 'déménage',
    icon: '/icons/demenagement.svg',
    text: 'Je déménage prochainement'
  }]
  const situations = [{
    key: 'emploi',
    text: 'Demandeur d\'emploi'
  }, {
    key: 'salarie',
    text: 'Salarié'
  }, {
    key: '26ans',
    text: 'Moins de 26 ans'
  }]

  useEffect(() => {
    onLoadPreviews()
  }, [])

  useEffect(() => {
    if (project || situation) {
      let l = previews.slice()
      if (project) {
        l = l.filter((i) => i.situtation.toLowerCase().indexOf(project.key.toLowerCase()) !== -1)
      }

      if (situation) {
        l = l.filter((i) => i.who.toLowerCase().indexOf(situation.text.toLowerCase()) !== -1)
      }

      setList(l)
    } else {
      setList(orderBy(previews, ['count_vue'], ['desc']).slice(0, 4))
    }
  }, [project, situation, previews])

  return (
    <MainLayout>
      {!isMobileView(size) && <Header />}
      <Container isMobile={isMobileView(size)}>
        <CategoryPanel>
          <Title>Découvrez les aides pour vous</Title>
          <SubTitle>Quel est votre projet ?</SubTitle>
          {categories.map((c) => (
            <CategoryTag
              key={c.text}
              selected={project && c.key === project.key}
              onClick={() => setProject(c.key === project ? null : c)}
            >
              <img src={c.icon} alt={c.text} />
              <p>{c.text}</p>
            </CategoryTag>
          ))}
          <SubTitle>Ma situation</SubTitle>
          {situations.map((c) => (
            <Tag
              key={c.text}
              selected={situation && c.key === situation.key}
              onClick={() => setStituation(c.key === situation ? null : c)}
            >
              <p>{c.text}</p>
            </Tag>
          ))}
        </CategoryPanel>
        <HelpsPanel isMobile={isMobileView(size)}>
          <TitleHelps isMobile={isMobileView(size)}>{project || situation ? 'Mes aides disponibles' : 'Les aides les plus consultées'}</TitleHelps>
          {list.map((item) => (
            <Item key={item.id} to={`/aides/${item.id}`} ismobile={isMobileView(size) ? 'true' : 'false'}>
              <p className="first-title">{item.title}</p>
              <p className="second-title">{item.goal}</p>
              {item.who.split(',').map((t) => <p className="tag" key={t}>{ucFirstOnly(t)}</p>)}
            </Item>
          ))}
        </HelpsPanel>
      </Container>
    </MainLayout>
  )
}

export default HelpsPage

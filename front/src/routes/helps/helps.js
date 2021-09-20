import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { MainLayout } from '../../components/main-layout'
import {
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'
import { objectToQueryString, paramUrlToObject } from '../../utils/url'

const Title = styled.h1`
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
  background: white;

  > div {
    display: flex;
    align-items: center;
    max-width: 800px;

    img {
      height: 216px;
      margin-right: 64px;
    }

    p {
      font-weight: bold;
    }
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 64px auto;
  padding: 0 16px;
  align-items: flex-start;

  ${(props) =>
    props.isMobile
      ? `
    display: block;
    margin: 0 0 64px 0;
    padding: 0;

    > div {
      width: 100%;
      border-radius: 0;
      box-shadow: none;
      margin-right: 0;
    }
  `
      : ''}
`

const CategoryPanel = styled.div`
  width: 424px;
  min-width: 424px;
  margin-right: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px 0 32px 16px;
`

const HelpsPanel = styled.div`
  flex: 1;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 24px 16px 32px 16px;

  ${(props) =>
    props.isMobile
      ? `
    padding: 0;
  `
      : ''}
`

const CategoryTag = styled(Link)`
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

  ${(props) =>
    props.selected
      ? `
    border: 2px solid ${COLOR_PRIMARY};

    p {
      color: ${COLOR_PRIMARY};
    }
  `
      : ''}
`

const Tag = styled(Link)`
  background: ${COLOR_GRAY};
  border-radius: 44px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  cursor: pointer;

  p {
    color: ${COLOR_TEXT_PRIMARY};
    font-weight: 500;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  ${(props) =>
    props.selected
      ? `
    background: ${COLOR_PRIMARY};

    p {
      color: white;
    }
  `
      : ''}
`

const TitleHelps = styled.div`
  margin-top: 0;
  margin-bottom: 16px;

  ${(props) =>
    props.isMobile
      ? `
    background-color: ${COLOR_BACKGROUND};
    height: 48px;
    line-height: 48px;
    font-weight: 500;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 0;
  `
      : ''}
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
    background: #ffffff;
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

  ${(props) =>
    props.ismobile === 'true'
      ? `
    padding: 20px 16px 16px 16px;
    border-top: none;
    border-bottom: 2px solid ${COLOR_BACKGROUND};
  `
      : ''}
`

const CATEGORIES = [
  {
    key: 'emploi',
    icon: '/icons/emploi.svg',
    text: 'Je recherche un emploi',
  },
  {
    key: 'logement',
    icon: '/icons/logement.svg',
    text: 'Je recherche un logement',
  },
  {
    key: 'déménage',
    icon: '/icons/demenagement.svg',
    text: 'Je déménage prochainement',
  },
]

const SITUATIONS = [
  {
    key: 'emploi',
    text: "Demandeur d'emploi",
  },
  {
    key: 'salarie',
    text: 'Salarié',
  },
  {
    key: 'Moins de 26 ans',
    text: 'Moins de 26 ans',
  },
  {
    key: 'Plus de 26 ans',
    text: 'Plus de 26 ans',
  },
]

const HelpsPage = ({ location: { search } }) => {
  const { previews, onLoadPreviews } = useHelps()
  const size = useWindowSize()

  useEffect(() => {
    onLoadPreviews()
  }, [])

  const projectParam = decodeURI(paramUrlToObject(search).project?.[0] || '')
  const situationParam = decodeURI(
    paramUrlToObject(search).situation?.[0] || ''
  )

  const project = CATEGORIES.find(({ key }) => projectParam === key) || null
  const situation = SITUATIONS.find(({ key }) => situationParam === key) || null

  let list = previews.filter((preview) => {
    if (situation) {
      if (!preview.who.toLowerCase().includes(situation.text.toLowerCase())) {
        return false
      }
    }

    if (project) {
      if (
        !preview.situtation.toLowerCase().includes(project.key.toLowerCase())
      ) {
        return false
      }
    }

    return true
  })

  if (!situation && !project) {
    list = orderBy(previews, ['count_vue'], ['desc']).slice(0, 4)
  }

  return (
    <MainLayout>
      {!isMobileView(size) && (
        <Header>
          <div className="wrapper">
            <img src="/Generique_Aides.png" alt="help" />
            <div className="text">
              <h1>
                Vous avez besoin d{"'"}
                aide pour votre projet de mobilité ?
              </h1>
              <p>Découvrez les solutions pour accélérer votre projet</p>
            </div>
          </div>
        </Header>
      )}
      <Container isMobile={isMobileView(size)}>
        <CategoryPanel>
          <Title>Découvrez les aides</Title>
          <SubTitle>Quel est votre projet ?</SubTitle>
          {CATEGORIES.map((c) => {
            const selected = project && c.key === project.key
            return (
              <CategoryTag
                key={c.text}
                selected={project && c.key === project.key}
                to={`/aides${objectToQueryString({
                  project: selected ? '' : c.key,
                  situation: situation?.key,
                })}`}
              >
                <img src={c.icon} alt={c.text} />
                <p>{c.text}</p>
              </CategoryTag>
            )
          })}
          <SubTitle>Ma situation</SubTitle>
          {SITUATIONS.map((c) => {
            const selected = situation && c.key === situation.key
            return (
              <Tag
                key={c.text}
                selected={selected}
                to={`/aides${objectToQueryString({
                  project: project?.key,
                  situation: selected ? '' : c.key,
                })}`}
              >
                <p>{c.text}</p>
              </Tag>
            )
          })}
        </CategoryPanel>
        <HelpsPanel isMobile={isMobileView(size)}>
          <TitleHelps isMobile={isMobileView(size)}>
            {project || situation
              ? 'Mes aides disponibles'
              : 'Les aides les plus consultées'}
          </TitleHelps>
          {list.map((item) => (
            <Item
              key={item.id}
              to={`/aides/${item.slug}`}
              ismobile={isMobileView(size) ? 'true' : 'false'}
            >
              <p className="first-title">{item.title}</p>
              <p className="second-title">{item.goal}</p>
              {item.who.split(',').map((t) => (
                <p className="tag" key={t}>
                  {ucFirstOnly(t)}
                </p>
              ))}
            </Item>
          ))}
        </HelpsPanel>
      </Container>
    </MainLayout>
  )
}

HelpsPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

HelpsPage.defaultProps = {
  location: {
    search: '',
  },
}
export default HelpsPage

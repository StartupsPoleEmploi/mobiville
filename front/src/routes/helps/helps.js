import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'

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
  height: 246px;
  margin: 0 auto;
  font-weight: bold;
  display: flex;
  align-items: center;
  max-width: 800px;
`

const HeaderImg = styled.img`
  height: 216px;
  margin-right: 64px;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 64px auto;
  padding: 0 16px;
  align-items: flex-start;

  ${(props) =>
    props.isMobile &&
    `
    display: block;
    margin: 0 0 64px 0;
    padding: 0;
  `}
`

const CategoryPanel = styled.div`
  width: 424px;
  min-width: 424px;
  margin-right: 16px;
  background: #ffffff;
  box-shadow: ${({ isMobile }) =>
    !isMobile
      ? `0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)`
      : ''};
  border-radius: 8px;
  padding: 16px 0 32px 16px;
`

const HelpsPanel = styled.div`
  flex: 1;
  background: #ffffff;
  box-shadow: ${({ isMobile }) =>
    !isMobile
      ? `0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)`
      : ''};
  border-radius: 8px;
  padding: ${({ isMobile }) => (isMobile ? '0' : '24px 16px 32px 16px')};
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
  background: ${({ selected }) => (selected ? COLOR_PRIMARY : COLOR_GRAY)};
  border-radius: 44px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  cursor: pointer;

  p {
    color: ${({ selected }) => (selected ? '#fff' : COLOR_TEXT_PRIMARY)};
    font-weight: 500;
    font-size: 12px;
    margin: 0;
    padding: 0;
  }
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

  const parsedQueryString = queryString.parse(search)
  const parsedSituations = parsedQueryString.situation
    ? typeof parsedQueryString.situation === 'string'
      ? [parsedQueryString.situation]
      : parsedQueryString.situation
    : []

  const project =
    CATEGORIES.find(({ key }) => parsedQueryString.project === key) || null
  const situations = SITUATIONS.filter(({ key }) =>
    parsedSituations.includes(key)
  )

  let list = previews.filter((preview) => {
    if (situations.length) {
      if (
        !situations.every(({ text }) =>
          preview.who.toLowerCase().includes(text.toLowerCase())
        )
      ) {
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

  if (!situations.length && !project) {
    list = orderBy(previews, ['count_vue'], ['desc']).slice(0, 4)
  }

  const isMobile = isMobileView(size)

  return (
    <MainLayout>
      <Helmet>
        <title>Liste des aides à la mobilité - Mobiville</title>
        <meta
          name="description"
          content="Trouvez facilement les aides dont vous pouvez bénéficier pour votre projet de mobilité en France"
        />
      </Helmet>

      {!isMobile && (
        <Header>
          <HeaderImg src="/Generique_Aides.png" alt="help" />
          <div className="text">
            <h1>
              Vous avez besoin d{"'"}
              aide pour votre projet de mobilité ?
            </h1>
            <p>Découvrez les solutions pour accélérer votre projet</p>
          </div>
        </Header>
      )}
      <Container isMobile={isMobile}>
        <CategoryPanel isMobile={isMobile}>
          <Title>Découvrez les aides</Title>
          <SubTitle>Quel est votre projet ?</SubTitle>
          {CATEGORIES.map((c) => {
            const selected = project && c.key === project.key
            return (
              <CategoryTag
                key={c.text}
                selected={project && c.key === project.key}
                to={`/aides?${queryString.stringify({
                  project: selected ? '' : c.key,
                  situation: situations.map(({ key }) => key),
                })}`}
              >
                <img src={c.icon} alt={c.text} />
                <p>{c.text}</p>
              </CategoryTag>
            )
          })}
          <SubTitle>Ma situation</SubTitle>
          {SITUATIONS.map((c) => {
            const selected = situations.some(({ key }) => key === c.key)
            const situationsForLink = selected
              ? situations.filter(({ key }) => key !== c.key)
              : situations.concat({ key: c.key })
            return (
              <Tag
                key={c.text}
                selected={selected}
                to={`/aides?${queryString.stringify({
                  project: project?.key,
                  situation: situationsForLink.map(({ key }) => key),
                })}`}
              >
                <p>{c.text}</p>
              </Tag>
            )
          })}
        </CategoryPanel>
        <HelpsPanel isMobile={isMobile}>
          <TitleHelps isMobile={isMobile}>
            {project || situations.length
              ? 'Mes aides disponibles'
              : 'Les aides les plus consultées'}
          </TitleHelps>
          {list.map((item) => (
            <Item
              key={item.id}
              to={`/aides/${item.slug}`}
              ismobile={isMobile ? 'true' : 'false'}
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

import React, { useState, useEffect } from 'react'
import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { sortBy } from 'lodash'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { MainLayout } from '../../components/main-layout'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'

const PAGE_HEADER_SIZE = 92
const MAIN_HEADER_SIZE = 0

const Wrapper = styled.div`
  margin: auto;
  max-width: 500px;
  padding: 8px;
  padding-top: 32px;
`

const H1 = styled.h1`
  height: ${PAGE_HEADER_SIZE}px;
  background: ${({ isMobile }) => (isMobile ? '#fff' : 'none')};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  top: ${({ isMobile }) => (isMobile ? '0' : `${MAIN_HEADER_SIZE}px`)};
  margin: 0;
  padding: 0 10px;
  width: 100%;
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'static')};
    box-shadow: ${({ isMobile }) => (
    isMobile
      ? '0 0 #fff, 0px 3px 4px rgba(0,0,0,0.12), 0px 1px 5px rgba(0,0,0,0.2)'
      : 'none'
  )};

  + * {
    margin-top: ${({ isMobile }) => (isMobile ? `${PAGE_HEADER_SIZE}px` : '0')};
  }
}
`

const H2 = styled.h2`
  && {
    font-size: 18px;
    font-size: bold;
  }
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  padding-bottom: 8px;
  font-size: 14px;
`

const Link = styled(_Link)`
  color: #000;
`

const OgrList = () => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [isLoading, setIsLoading] = useState(true)
  const [ogrsByRome, setOgrsByRome] = useState({})

  useEffect(() => {
    setIsLoading(true)

    axios.get('/api/ogrs').then((response) => {
      const groupedData = sortBy(
        response.data.data,
        ['romeLabel', 'ogrLabel']
      )
        .reduce((prev, { rome, romeLabel, ogrLabel }) => ({
          ...prev,
          [rome]: {
            label: romeLabel,
            ogrs: (prev[rome]?.ogrs || []).concat(ogrLabel)
          }
        }), {})

      setOgrsByRome(groupedData)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div style={{ margin: 'auto' }}>Chargement…</div>
    )
  }

  return (
    <MainLayout>
      {isMobile && (
      <H1 isMobile>
        <Link to="/rechercher" style={{ marginRight: 8, marginTop: 6 }}>
          <ArrowBackOutlinedIcon />
        </Link>
        Les métiers disponibles sur Mobiville
      </H1>
      )}
      <Wrapper style={{ marginTop: isMobile ? PAGE_HEADER_SIZE : 0 }}>
        {!isMobile && (
        <H1>
          Les métiers disponibles sur Mobiville
        </H1>
        )}
        {Object.keys(ogrsByRome).map((romeCode) => (
          <div>
            <H2>{ogrsByRome[romeCode].label}</H2>
            <Ul>
              {ogrsByRome[romeCode].ogrs.map((label) => (
                <Li>
                  <Link to={`/rechercher/region?code_rome=${romeCode}`}>{label}</Link>
                </Li>
              ))}
            </Ul>
          </div>
        ))}
      </Wrapper>
    </MainLayout>
  )
}

export default OgrList

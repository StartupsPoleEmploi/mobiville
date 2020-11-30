import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MainLayout } from '../../components/main-layout'
import SEARCH_VIEW from '../../assets/images/search_view.svg'
import HELP_VIEW from '../../assets/images/help_view.svg'
import { Button } from '../../components/button'

const BlockInformation = styled.div`
  margin: 32px 16px;
  padding: 16px;
  background-color: ${(props) => (props.green ? '#AFE1E2' : '#99DBF6')};
  border-radius: 8px;

  > img {
    margin: auto;
    display: block;
  }

  > h2 {
    font-size: 18px;
  }

  > p {
    font-weight: bold;
  }
`

const LinkNoUnderline = styled(Link)`
  text-decoration: none;
`

const HomePage = () => (
  <MainLayout>
    <BlockInformation green>
      <img src={SEARCH_VIEW} alt="Rechercher" />
      <h2>Vous souhaitez bouger pour retrouver un emploi ?</h2>
      <p>Trouvez le job dans la ville de vos rêves</p>
      <LinkNoUnderline to="/rechercher"><Button style={{ backgroundColor: '#00B9B6' }}>Rechercher</Button></LinkNoUnderline>
    </BlockInformation>

    <BlockInformation>
      <img src={HELP_VIEW} alt="Rechercher" />
      <h2>Vous avez besoin d&apos;aide pour votre projet de mobilité ?</h2>
      <p>Trouver les aides dont vous disposez</p>
      <LinkNoUnderline to="/aides"><Button style={{ backgroundColor: '#00A4E8' }}>Les aides à la mobilité</Button></LinkNoUnderline>
    </BlockInformation>
  </MainLayout>
)

export default HomePage

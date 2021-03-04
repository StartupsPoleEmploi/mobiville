import React from 'react'
import styled from 'styled-components'
import { MainLayout } from '../../components/main-layout'

const Container = styled.div`
  margin: 124px 16px;

  > .wrapper {
    max-width: 600px;
  }
`

const LegalPage = () => (
  <MainLayout footer topMobileMenu>
    <Container>
      <div className="wrapper">
        <h2>
          Conditions générales d
          {'\''}
          utilisation Mobiville
        </h2>
      </div>
    </Container>
  </MainLayout>
)

export default LegalPage

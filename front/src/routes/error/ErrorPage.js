import React from 'react'
import styled from 'styled-components'
import MainLayout from '../../components/MainLayout'

import { Image } from '../../components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #657078;
`

const CustomImage = styled(Image)`
  margin-bottom: 2rem;
`

const ErrorPage = () => (
  <MainLayout>
    <Container>
      <CustomImage src="technical-error" alt="" />
      Problème technique
      <br />
      Veuillez réessayer plus tard
    </Container>
  </MainLayout>
)

export default React.memo(ErrorPage)

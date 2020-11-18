import React from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import { useUser } from '../../common/contexts/userContext'
import { MainLayout } from '../../components/main-layout'

const LoginPage = () => {
  const { onLogin, user } = useUser()

  if (user) {
    return <Redirect to="/dashboard" />
  }

  return (
    <MainLayout>
      <Button variant="contained" color="primary" onClick={() => onLogin('fxaviermontigny@gmail.com', '123456')}>
        Login with fxaviermontigny@gmail.com
      </Button>
    </MainLayout>
  )
}

export default LoginPage

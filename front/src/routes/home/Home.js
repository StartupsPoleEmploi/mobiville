import React from 'react'
import { Helmet } from 'react-helmet-async'
import loadable from '@loadable/component'

import { COLOR_BACKGROUND } from '../../constants/colors'

import { MainLayout } from '../../components/'

const Welcome = loadable(() => import('./components/Welcome'))
const Advantages = loadable(() => import('./components/Advantages'))
const HomeHelpsBanner = loadable(() => import('./components/HomeHelpsBanner'))
const HomeRegionsBanner = loadable(() => import('./components/HomeRegionsBanner'))
const GuideBanner = loadable(() =>import('./components/GuideBanner'))
const Testimonies = loadable(() => import('./components/Testimonies'))
const TopPageButton = loadable(() => import('../../components/TopPageButton'))

const HomePage = () => (
  <MainLayout
    topMobileMenu
    style={{ background: COLOR_BACKGROUND }}
    displaySearch={false}
    menu={{ visible: true, menuMobileVisible: false }}
  >
    <Helmet>
      <title>Trouvez l’emploi et la ville qui va avec ! | Mobiville</title>
      <meta
        name="description"
        content="Mobiville permet aux demandeurs d’emploi et aux salariés de choisir la ville adaptée à leur projet ainsi que les aides financières à la mobilité."
      />
    </Helmet>

    <Welcome />

    <HomeHelpsBanner />
    <HomeRegionsBanner />
    <Advantages />
    <GuideBanner />
    <TopPageButton />
    <Testimonies />
  </MainLayout>
)

export default HomePage

import React from 'react'
import { ConnectedLayout } from '../components/connected-layout'
import { SearchCriterions } from './search-criterions'
import { SearchRegions } from './search-regions'
import { SearchRome } from './search-rome'

const DashboardPage = () => (
  <ConnectedLayout title="Dashboard">
    <SearchRome />
    <SearchRegions />
    <SearchCriterions />
  </ConnectedLayout>
)

export default DashboardPage

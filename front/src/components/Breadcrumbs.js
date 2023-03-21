import styled from 'styled-components'
import PropTypes from 'prop-types'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { Breadcrumbs as _Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const CustomBreadcrumbs = styled(_Breadcrumbs)`
  padding-top: 20px;
`

const Breadcrumbs = ({ breadcrumbs, style = {} }) => (
  <CustomBreadcrumbs
    separator={<NavigateNextIcon fontSize="small" />}
    aria-label="breadcrumb"
    style={{ ...style }}
  >
    {breadcrumbs.map((bread, index) =>
      !!bread.link ? (
        <Link underline="hover" key={index} to={bread.link}>
          {bread.text}
        </Link>
      ) : (
        <Typography key={index}>{bread.text}</Typography>
      )
    )}
  </CustomBreadcrumbs>
)

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Breadcrumbs

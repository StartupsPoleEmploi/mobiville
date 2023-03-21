import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { isExternalLink } from '../../../utils/utils'

const ExternalLinkCTAContainer = styled.a.attrs({
  target: '_blank',
})`
  display: flex;
  flex-direction: row;
  gap: 8px;

  text-decoration: underline;
  font-weight: 700;
  font-size: 16px;
`

const LinkCTAContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 8px;

  text-decoration: underline;
  font-weight: 700;
  font-size: 16px;
`

const LinkCTA = ({ href, light, children }) => {
  if (isExternalLink(href)) {
    return (
      <ExternalLinkCTAContainer href={href} $light={light}>
        <ArrowForwardIcon />
        {children}
      </ExternalLinkCTAContainer>
    )
  }
  return (
    <LinkCTAContainer to={href} $light={light}>
      <ArrowForwardIcon />
      {children}
    </LinkCTAContainer>
  )
}

LinkCTA.propTypes = {
  href: PropTypes.string,
  light: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default LinkCTA

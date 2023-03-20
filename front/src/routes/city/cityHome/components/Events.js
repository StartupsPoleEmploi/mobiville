import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CircularProgress } from '@mui/material'

import {
  ActionButton,
  HorizontalScrollableSection,
} from '../../../../components'
import {
  COLOR_BUTTON_HOVER,
  COLOR_OTHER_GREEN,
  COLOR_PRIMARY,
  COLOR_PURPLE,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { ReactComponent as ComputerIcon } from '../../../../assets/images/icons/computer.svg'
import { capitalize, formatDateShort } from '../../../../utils/utils'


const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: auto;
`

const Card = styled.a`
  min-width: 300px;
  padding: 16px;

  border-radius: 8px;

  background: ${COLOR_WHITE};

  &:hover {
    box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: inset 0px 0px 0px 1px ${COLOR_PRIMARY};
  }

  & > p {
    margin: 6px 0 0 0;
  }
  & > p:not(:last-child) {
    margin: 6px 0;
  }
`

const Header = styled.div`
  display: flex;
  align-items: start;
`

const Date = styled.p`
  min-width: 52px;
  min-height: 52px;
  margin: 0;
  padding: 8px 0;
  border-radius: 8px;

  background: ${COLOR_OTHER_GREEN};
  text-align: center;
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
`

const Title = styled.p`
  margin: 0 0 0 8px;

  color: ${COLOR_PRIMARY};
  font-size: 18px;
  font-weight: 700;
`

const Location = styled.p`
  color: ${COLOR_TEXT_PRIMARY};
  font-size: 16px;
  font-weight: 700;
`

const Tag = styled.p`
  width: fit-content;
  padding: 4px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  gap: 8px;

  background: ${COLOR_PURPLE};

  color: ${COLOR_BUTTON_HOVER};
  font-size: 12px;
  font-weight: 700;
`

const Events = ({ events }) => {
  return (
    <Container>
      {!events
        ? <div
          style={{
            display: 'grid',
            placeContent: 'center',
            width: '100%',
            height: '100%',
            minHeight: '200px',
          }}
        >
          <CircularProgress />
        </div>
        : null}

      <HorizontalScrollableSection>
        {events?.map(event => (
          <Card href={event.urlSalonEnLigne} target="_blank">
            <Header>
              <Date>{ formatDateShort(event.dateDebut).split(' ')[0] }<br />{ capitalize(formatDateShort(event.dateDebut).split(' ')[1]) }</Date>
              <Title>{ event.titre }</Title>
            </Header>
            <Location>{ event.localisation }</Location>
            <Tag><ComputerIcon /> En ligne</Tag>
          </Card>
        ))}
      </HorizontalScrollableSection>

      <ActionButton
        path='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
        libelle='Découvrez les autres rencontres'
        isWhite
        isBlue={false}
        style={{ width: 'fit-content', margin: '0 auto' }}
      />
    </Container>
  )
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
}

export default Events

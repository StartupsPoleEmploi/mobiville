import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useCities } from '../../../../common/contexts/citiesContext'
import { useWindowSize } from '../../../../common/hooks/window-size'
import {
  COLOR_PRIMARY,
  COLOR_VERT_MOBIVILLE,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { isMobileView } from '../../../../constants/mobile'
import { capitalize, wordsCapitalize } from '../../../../utils/utils'
import { Tag } from '../../../../components'

const Container = styled.div`
  max-width: 1072px; // 1040 + 16 * 2
  width: 100%;
  margin: auto;
  padding: 16px;

  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? '1fr' : 'repeat(2, minmax(438px, 1fr))'};
  grid-gap: 24px;

  color: ${COLOR_PRIMARY};
`

const Card = styled.div`
  max-width: calc(100vw - 32px);

  padding: 24px 16px;
  border-radius: 4px;

  background-color: ${COLOR_WHITE};
`

const CompaniesCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const CardTitle = styled.p`
  margin: 0 0 12px 0;

  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
`

const CompanyName = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`

const CompanyCity = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`

const DataFrom = styled.a`
  margin-top: 12px;

  color: ${COLOR_VERT_MOBIVILLE} !important;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-left: 4px;
  color: inherit;
  text-decoration: none;
`
const Lien = styled.a`
  display: block;
  margin: 6px 0;

  text-decoration: underline;
`

const CloseOpportunities = ({ secteurs }) => {
  const isMobile = isMobileView(useWindowSize())
  const { closeCompanies } = useCities()

  return (
    <Container $isMobile={isMobile}>
      <CompaniesCard $isMobile={isMobile}>
        <CardTitle>Les entreprises qui recrutent</CardTitle>
        {closeCompanies?.slice(0, 5).map((company, index) => (
          <Lien key={index} href={company.url} target="_blank">
            <CompanyName>{wordsCapitalize(company.name)}</CompanyName>{' '}
            <CompanyCity>{capitalize(company.city)}</CompanyCity>
          </Lien>
        ))}
        <DataFrom
          target="_blank"
          href="https://labonneboite.pole-emploi.fr/"
          onClick={() => {
            window.smartTagPiano({
              name: 'acces_entreprise',
              type: 'exit',
              chapters: ['city', 'labonneboite'],
            })
          }}
        >
          (Données issues de <u>La Bonne Boite</u>)
        </DataFrom>
      </CompaniesCard>

      {!!secteurs?.length > 0 ? (
        <Card>
          <CardTitle>Secteurs qui recrutent</CardTitle>
          {secteurs
            .sort((a, b) => a.demandeurs_emploi - b.demandeurs_emploi)
            .slice(0, 8)
            .map((secteur) => (
              <Tag
                green
                size="normal"
                title={
                  secteur.secteur_libelle.length >= 60
                    ? secteur.secteur_libelle
                    : null
                }
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  margin: 4,
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {secteur.secteur_libelle}
              </Tag>
            ))}
        </Card>
      ) : null}
    </Container>
  )
}

CloseOpportunities.propTypes = {
  secteurs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CloseOpportunities

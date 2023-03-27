import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Grid } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { Tag } from '../../../components'
import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE
} from '../../../constants/colors'

const Container = styled(Link)`
  border-radius: 8px;
  overflow: hidden;

  justify-content: flex-end;
  align-items: flex-end;

  padding: 18px;
  gap: 33px;

  height: ${({ $isMobile }) => ($isMobile ? '' : '231px')};
  border: ${({ $isMobile }) => ($isMobile ? 'none' : '2px solid #fff')};

  display: block;

  background: #ffffff;
  color: ${COLOR_TEXT_PRIMARY};

  &:hover {
    border: ${({ $isMobile }) => ($isMobile ? 'none' : '2px solid #191970')};
  }
`

// HEADER
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  background: ${ COLOR_WHITE };
  color: ${COLOR_TEXT_PRIMARY};
`

const HeaderTextContainer = styled.div`
  display: inline-grid;
  vertical-align: top;
  width: ${({ $isMobile }) => ($isMobile ? '200px' : '350px')};
`

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: ${({ $isMobile }) => ($isMobile ? '21px' : '33px')};

  vertical-align: bottom;
  display: contents;

  color: ${COLOR_TEXT_PRIMARY};
`

const LogoContainer = styled.div`
  display: inline-grid;
  align-items: start;
  justify-content: center;

  width: 96px;
  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '5px')};

  background: ${ COLOR_WHITE };
`

const Logo  = styled.img`
  max-width: 100%;
`

// HELP TYPE
const TypeTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  gap: 4px;
`

// FILTERS
const FiltersContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${COLOR_PRIMARY};
`

const FiltersText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #191970;
`

// OTHERS
const ViewMore = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR_PRIMARY};
  font-weight: bold;
  font-size: 16px;
  justify-content: flex-end;
  padding-top: 8px;
`

const MobileResizer = styled.div`
  height: 8px;
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'none')};
`

const logoStyle = {
    'mobili-pass.jpg': { width: '100px', height: 'auto' },
    'visale.jpg': { width: '100px', height: 'auto' },
    'action-logement-2.png': { width: '100px', height: 'auto' },
    'renault-group.png': { width: '110px', height: 'auto', paddingTop: '5px' },
    'pole-emploi.png': { width: 'auto', height: '55px' },
    'dossier-facile.png': { width: '60px', height: 'auto',  paddingTop: '9px' },
    defaultStyle: { width: 'auto', height: '60px' },
}

  
const filterHelpItemWho = function (who) {
    let whoItems = ''
    const lowerCaseWho = who.toLowerCase()
    if (lowerCaseWho.includes('salarié')) whoItems += 'salarié^'
    if (lowerCaseWho.includes('*tout public')) whoItems += '*tout public^'
    if (lowerCaseWho.includes('alternance')) whoItems += 'alternance^'

    if (lowerCaseWho.includes("demandeur d'emploi avec promesse d'embauche^")) {
        whoItems += "demandeur d'emploi avec promesse d'embauche^"
    } else {
        if (lowerCaseWho.includes("demandeur d'emploi"))
        whoItems += "demandeur d'emploi^"
    }

    if (lowerCaseWho.includes('DE -26 ans')) whoItems += 'DE -26 ans^'
    if (lowerCaseWho.includes('moins de 26 ans')) whoItems += '-26 ans^'
    if (lowerCaseWho.includes('plus de 26 ans')) whoItems += '+26 ans^'
    if (lowerCaseWho.includes('moins de 30 ans')) whoItems += '-30 ans^'
    if (lowerCaseWho.includes('plus de 30 ans')) whoItems += '+30 ans^'
    if (lowerCaseWho.includes('jeune de 18 à 30 ans'))
        whoItems += 'jeune de 18 à 30 ans^'

    if (whoItems.length > 0)
        whoItems = whoItems.substring(0, whoItems.length - 1)

    return whoItems
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const HelpCard = ({
    help,
    isMobile
}) => {

    return (
        <Grid
            item
            xs={12}
            md={6}
        >
            <Container
                $isMobile={isMobile}
                to={`/aides/${help.slug}` + window.location.search}
            >
                <div>
                    <HeaderContainer>

                        <HeaderTextContainer $isMobile={isMobile}>

                            <MobileResizer $isMobile={isMobile}></MobileResizer>

                            <Title $isMobile={isMobile}>{ help.title }</Title>

                            <TypeTagContainer>
                                <Tag green bold>
                                    { help.icon }
                                    { help.type }
                                </Tag>
                            </TypeTagContainer>

                        </HeaderTextContainer>

                        <LogoContainer>
                            <Logo
                                src={`/help-logos/100px/${help.logo}`}
                                alt=""
                                srcSet={`
                                  /help-logos/120px/${help.logo} 1x,
                                  /help-logos/240px/${help.logo} 2x,
                                `}
                                style={
                                    logoStyle[
                                        help.logo in logoStyle
                                            ? help.logo
                                            : 'defaultStyle'
                                        ]
                                } 
                            >
                              
                            </Logo>
                        </LogoContainer>

                    </HeaderContainer>

                    <FiltersContainer>
                        <FiltersText
                            dangerouslySetInnerHTML={{
                            __html: filterHelpItemWho(help.who)
                                .split('^')
                                .map((t) => capitalize(t))
                                .join(' • '),
                            }}
                        ></FiltersText>
                    </FiltersContainer>

                    <div>{ help.goal }</div>

                    <ViewMore>
                        Découvrir l'aide <ArrowForwardIcon fontSize="small" />
                    </ViewMore>
                </div>
            </Container>
        </Grid>
    )
}

export default HelpCard
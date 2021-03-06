/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as _Link } from 'react-router-dom'
import _ArrowForward from '@mui/icons-material/ArrowForward'

import { MainLayout } from '../../components/main-layout'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useScroll } from '../../common/hooks/use-scroll'

const PAGE_HEADER_SIZE = 92
const MAIN_HEADER_SIZE = 76

const Contents = styled.div`
  width: ${(props) => (props.isMobile ? 'auto' : '512px')};
  margin: auto;
`

const ContentBlock = styled.div`
  margin: ${(props) => (props.isMobile ? '0' : '16px 0')};
  padding: 8px 16px 16px;
  background-color: #fff;
  box-shadow: ${(props) =>
    props.isMobile
      ? 'none'
      : '0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
`

const H1 = styled.h1`
  height: ${PAGE_HEADER_SIZE}px;
  background: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  top: ${({ isMobile }) => (isMobile ? '0' : `${MAIN_HEADER_SIZE}px`)};
  margin: 0;
  padding: 0 10px;
  width: 100%;
  position: ${({ shouldUseFixedHeader }) =>
    shouldUseFixedHeader ? 'fixed' : 'static'};
    box-shadow: ${({ shouldUseFixedHeader }) =>
      shouldUseFixedHeader
        ? '0 0 #fff, 0px 3px 4px rgba(0,0,0,0.12), 0px 1px 5px rgba(0,0,0,0.2)'
        : 'none'};

  + * {
    margin-top: ${({ shouldUseFixedHeader }) =>
      shouldUseFixedHeader ? `${PAGE_HEADER_SIZE}px` : '0'};
  }
}
`

const Link = styled(_Link)`
  display: flex;
  align-items: center;
`

const A = styled.a`
  display: flex;
  align-items: center;
`

const ArrowForward = styled(_ArrowForward)`
  font-size: 14px !important;
  margin-left: 5px;
`

const MobilityGuide = () => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)
  const { scrollY } = useScroll()

  const shouldUseFixedHeader = isMobile
    ? scrollY > 0
    : scrollY > MAIN_HEADER_SIZE

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <H1 isMobile={isMobile} shouldUseFixedHeader={shouldUseFixedHeader}>
        Conseils et astuces pour votre projet de mobilit??
      </H1>

      <Contents isMobile={isMobile}>
        <ContentBlock isMobile={isMobile}>
          <h2>Etape 1 :</h2>
          <p>
            <b>Vous avez choisi une ville et vous cherchez un emploi</b>
          </p>
          <p>
            Retournez sur la page pr??c??dente et choisissez l???offre d???emploi qui
            vous convient
          </p>
          <p>
            En cas de d??placement pour un entretien d'embauche, vous pouvez
            b??n??ficier d'aides financi??res, si vous ??tes demandeur d'emploi :
            <br />
            <ul>
              <li>Prise en charge du billet de train</li>
              <li>Remboursement des frais pour un logement</li>
            </ul>
          </p>
          <p>
            <Link to="/aides/aide-pour-la-recherche-demploi">
              D??couvrir l'aide et les conditions
              <ArrowForward />
            </Link>
          </p>
        </ContentBlock>

        <ContentBlock isMobile={isMobile}>
          <h2>Etape 2 :</h2>
          <p>
            <b>Vous ??tes embauch??(e) et vous recherchez un logement</b>
          </p>
          <p>
            Pour acc??der ?? un logement, il faut imp??rativement une promesse
            d'embauche.
          </p>
          <p>
            D??couvrez des aides pour avoir un dosser de location en b??ton ou
            pour acc??der ?? un logement temporaire.
          </p>
          <p>
            <Link to="/aides?project=logement">
              Je cherche un logement
              <ArrowForward />
            </Link>
          </p>
          <p>L???astuce Mobiville</p>
          <p>
            Vous souhaitez ??tre accompagn?? dans votre recherche de logement ?
            C'est possible en contactant un conseiller Logement d??di?? ?? votre
            projet.
          </p>
          <p>
            <A href="https://www.actionlogement.fr/demande-mobilite">
              Contacter un conseiller
              <ArrowForward />
            </A>
          </p>
        </ContentBlock>

        <ContentBlock isMobile={isMobile}>
          <h2>Etape 3 :</h2>
          <p>
            <b>Vous allez bient??t d??m??nager</b>
          </p>
          <p>
            D??m??nager peut vous couter moins cher !
            <br />
            C'est le cas avec l'aide "Mon job mon logement" qui vous permet
            d'avoir 1000 euros
          </p>
          <p>
            <Link to="/aides/mon-job-mon-logement">
              D??couvrir cette aide
              <ArrowForward />
            </Link>
          </p>
          <p>
            La plupart de ces aides sont cumulables entre elles, donc n'h??sitez
            pas ?? en profiter !
            <br />
            Au final, votre d??m??nagement vous co??tera moins cher que ce que vous
            auriez pu imaginer !
          </p>
        </ContentBlock>

        <ContentBlock isMobile={isMobile}>
          <h2>Etape 4:</h2>
          <p>
            <b>??a y est ! Vous avez d??m??nag?? !</b>
          </p>

          <p>
            Bravo !!!
            <br />
            Pensez ?? faire votre changement d'adresse postale ici pour d??clarer
            vos nouvelles coordonn??es aupr??s de plusieurs services
            administratifs.
            <br />
            Si vous ??tes demandeur d???emploi, n???oubliez pas de vous d??sinscrire
            de P??le Emploi apr??s votre p??riode d???essai.
          </p>
          <p>
            <b>Merci d???avoir utilis?? notre service</b>
            <p>
              Prenez quelques minutes pour nous donner votre avis et voter pour
              les prochaines fonctionnalit??s.
            </p>
            <p>
              <A href="https://startupsbeta.typeform.com/to/pJJUS1Vg">
                Enqu??te de satisfaction
                <ArrowForward />
              </A>
            </p>
          </p>
        </ContentBlock>
      </Contents>
    </MainLayout>
  )
}

MobilityGuide.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

MobilityGuide.defaultProps = {
  location: {
    search: '',
  },
}

export default MobilityGuide

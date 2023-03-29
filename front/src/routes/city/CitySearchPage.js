import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { MainLayout, Modale, Section } from "../../components"
import CityForm from "../../components/CityForm"
import { COLOR_BACKGROUND, COLOR_PRIMARY } from "../../constants/colors"
import { Breadcrumbs, Image } from "../../components"
import { useDevice } from "../../common/contexts"

const Container = styled(Section)`
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    margin-top: 24px;

    font-size: 36px;
    font-weight: 900;
    color: ${ COLOR_PRIMARY };
`

const CitySearchPage = () => {
    const { isMobile } = useDevice()
    const navigate = useNavigate()

    if (isMobile) {
        return (
            <Modale show
                title="Recherchez une ville"
                onClose={() => navigate('/')}
            >
                <CityForm />
            </Modale>
        )
    } else {
        return (
            <MainLayout
                style={{ background: COLOR_BACKGROUND }}
            >
                <Container>
                    <Breadcrumbs breadcrumbs={[
                        { text: 'Accueil', link: '/' },
                        { text: 'Rechercher un métier' },
                    ]}/>
                        
                    <Title>Recherchez le métier et l'endroit qui vous correspond !</Title>

                    <CityForm />

                    <Image src="cities" style={{ margin: '50px auto 0 auto' }} />
                </Container>
            </MainLayout>
        )
    }

}

export default CitySearchPage
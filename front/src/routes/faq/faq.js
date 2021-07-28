import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../components/main-layout'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'

const QUESTION_ANSWERS = [
  {
    question: 'Faut-il être inscrit à Pôle emploi pour utiliser Mobiville ?',
    answer: (
      <>
        Non. Le service cible les personnes qui envisagent d’élargir le périmètre
        {' '}
        de recherche d’emploi vers une autre ville en France.
        {' '}
        Il s’adresse aux demandeurs d’emploi, salariés, étudiants…
      </>
    ),
    isOpen: false
  },
  {
    question: 'Je ne trouve pas mon métier dans la liste proposée, c’est normal?',
    answer: (
      <>
        Le service cible en priorité
        {' '}
        <Link to="/rome-list">les métiers</Link>
        {' '}
        dans lesquels il y a des difficultés de
        {' '}
        recrutement, de nouveaux métiers seront intégrés progressivement.
      </>
    ),
    isOpen: false
  },
  {
    question: 'La région qui m’intéresse n’est pas dans la liste proposée, c’est normal ?',
    answer: (
      <>
        Le service valorise des villes où les difficultées de recrutement sont fortes. Si une
        {' '}
        région ne comporte aucune ville en difficulté de recrutement, elle n’apparaîtra pas.
      </>
    ),
    isOpen: false
  },
  {
    question: 'Quelles sont les villes proposées par Mobiville ?',
    answer: (
      <>
        Mobiville se base sur un listing de bassins d’emploi en tension.
        <br />
        C’est à dire des bassins dans lesquels:
        <ul>
          <li>les entreprises ont dû mal à recruter</li>
          <li>il n’y a pas suffisamment de main d’oeuvre qualifiée sur le territoire</li>
        </ul>
        Grâce à la prise en compte de ce listing + les critères individuels renseignés par la
        {' '}
        personne, Mobiville suggère des villes.
      </>
    ),
    isOpen: false
  },
  {
    question: 'Je cherche une ville précise dans Mobiville mais je ne la trouve pas, comment faire ?',
    answer: (
      <>
        Pour l’instant, cette fonctionnalité n’existe pas dans Mobiville
      </>
    ),
    isOpen: false
  },
  {
    question: 'D’où viennent les données utilisées par le service ?',
    answer: (
      <>
        Les sources de données de Mobiville sont:
        <ul>
          <li>les données publiques de Pôle emploi, via l’Emploi Store Développeurs</li>
          <li>les données publiques de l’Insee</li>
          <li>les données publiques présentes sur Data.gouv.fr</li>
          <li>les données fournies par Action Logement</li>
        </ul>
      </>
    ),
    isOpen: false
  },
  {
    question: 'Si je suis inscrit comme demandeur d’emploi et que je fais une recherche via Mobiville, cela aura-t-il un impact sur mon dossier ?',
    answer: (
      <>
        Non, il n’y a pas d’impact sur votre dossier Pôle emploi à moins que vous
        {' '}
        décidiez d’informer votre conseiller de votre projet de mobilité
      </>
    ),
    isOpen: false
  },
  {
    question: 'J’ai identifié une ville dans Mobiville, et j’ai envie d’y partir. C’est quoi la suite?',
    answer: (
      <>
        Nous vous avons préparé un guide pour identifier les prochaines étapes pour votre
        {' '}
        projet. Téléchargez-le
        {' '}
        <a target="_blank" href="/pdf/je-demenage.pdf">ici</a>
      </>
    ),
    isOpen: false
  }
]

const Container = styled.div`
  margin: 64px 16px;

  > .wrapper {
    max-width: 600px;
  }
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 32px;
`

const Question = styled.div`
  margin-bottom: 16px;
  display: inline-block;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const Answer = styled.p`
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;


  ${(props) => (props.isOpen ? `
    height: auto;
    padding: 4px 16px 16px 16px;
  ` : '')}
`

const HelpMore = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR_TEXT_PRIMARY};

  a {
    color: ${COLOR_TEXT_PRIMARY};
    text-decoration: underline;
    font-weight: 500;
  }
`

const FAQPage = () => {
  const [list, setList] = useState([...QUESTION_ANSWERS])

  const onToggleOpen = (index) => {
    list[index].isOpen = !list[index].isOpen
    setList([...list])
  }

  return (
    <MainLayout footer topMobileMenu>
      <Container>
        <div className="wrapper">
          <Title>
            FAQ Mobiville
          </Title>
          {list.map(({ question, answer, isOpen }, index) => (
            <Question key={question} onClick={() => onToggleOpen(index)}>
              <Header>
                <p>{question}</p>
                <i className="material-icons">expand_more</i>
              </Header>
              <Answer
                isOpen={isOpen}
              >
                {answer}
              </Answer>
            </Question>
          ))}

          <HelpMore>
            Vous n’avez trouvé votre réponse ?
            <br />
            Contactez nous :
            <br />
            <br />
            <a href="mailto:contact@mobiville.pole-emploi.fr">
              contact@mobiville.pole-emploi.fr
            </a>
          </HelpMore>
        </div>
      </Container>
    </MainLayout>
  )
}

export default FAQPage

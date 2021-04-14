import React, { useState } from 'react'
import styled from 'styled-components'
import { MainLayout } from '../../components/main-layout'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { FAQ } from '../../constants/faq'

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
  const [list, setList] = useState([...FAQ])

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
          {list.map((f, i) => (
            <Question key={f.question} onClick={() => onToggleOpen(i)}>
              <Header>
                <p>{f.question}</p>
                <i className="material-icons">expand_more</i>
              </Header>
              <Answer
                isOpen={f.isOpen}
                dangerouslySetInnerHTML={{
                  __html: f.answer
                }}
              />
            </Question>
          ))}

          <HelpMore>
            Vous n’avez trouvé votre réponse ?
            <br />
            Contactez nous :
            <br />
            <br />
            <a href="mailto:
contact@mobiville.pole-emploi.fr"
            >
              contact@mobiville.pole-emploi.fr

            </a>
          </HelpMore>
        </div>
      </Container>
    </MainLayout>
  )
}

export default FAQPage

import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import mq from '../utils/breakpoints'
import melodoro from '../images/melodoro.png'
import austincold from '../images/austincold.png'
import castlewars from '../images/castle-wars.png'
import framer from '../images/framer.png'

import { Container } from '../components/common'

const StyledProjects = styled.section`
  width: 100%;
  padding: 4rem 0;
  background-image: var(--gradient);
  transform: translateY(calc(96vh - 92px));

  h2 {
    font-size: 4rem;
    color: #f1f1f1aa;
    margin-bottom: 5rem;
    text-align: center;
    transform: rotate(-5deg);
  }
`

const ProjectList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  color: #eee;
  font-family: var(--primary-font-family);
  justify-items: stretch;

  ${mq[0]} {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: repeat(10, 1fr);
    grid-gap: 3rem;
  }

  ${mq[1]} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 3rem;
  }
`

const ImageBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gradient);
  border-radius: 2.5rem;
  padding: 5px;
  margin-bottom: 2rem;
`

const ProjectListItem = styled(motion.li)`
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 2rem;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 2rem;
    color: #f1f1f1;
    margin-bottom: 2rem;
    background-image: linear-gradient(to bottom right, hotpink, #fff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  img {
    max-width: 100%;
    border-radius: 2.5rem;
  }

  p {
    font-size: 2rem;
    color: var(--text-inverted);
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-bottom: 6rem;

    ${mq[0]} {
      font-size: 2.5rem;
    }
  }
`

const ViewButton = styled(motion.a)`
  background: var(--gradient);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.5rem;
  font-weight: bold;
  margin-top: auto;
  padding: 1rem 2rem;
`

const Projects = () => {
  const projects = useMemo(
    () => [
      {
        name: 'Melodoro',
        to: 'https://melodoro.netlify.app/',
        desc:
          'A pomodoro app built with React and styled components. This project focuses on micro interactions and how web based animations can make using UI playful and fun.',
        image: melodoro,
      },
      {
        name: 'Austin cold',
        to: 'https://austincold.com',
        desc:
          'In Febuary of 2021, Texas froze as three simultaneous winter storms relentlessly attacked the state for days. Worked with a team of 3 within 5 hours to create a site to direct traffic for donations, supplies, and help. The site helped raise over $1.5 million dollars, found hotels for over 400 freezing homeless, and found food for 3000+ hungry souls.',
        image: austincold,
      },
      {
        name: 'Castle wars',
        to: 'https://mystifying-clarke-e1f0c2.netlify.app/',
        desc:
          'Created a two player castle war game based off a the classic Castle wars 2 flash game. The site uses Vue for the front-end framework and cloudinary to host the images and icons.',
        image: castlewars,
      },
      {
        name: 'Learn framer motion',
        to: 'https://learn-framer-motion.netlify.app/',
        desc:
          'Developed and designed a single page blog for a Framer motion talk. The site teaches you about the basics of framer motion. Utilized GatsbyJS and React live to showcase live coding examples.',
        image: framer,
      },
    ],
    []
  )

  return (
    <StyledProjects>
      <Container>
        <h2>projects</h2>
        <ProjectList>
          {projects.map(project => (
            <ProjectListItem
              whileHover={{ scale: 1.03, y: -5 }}
              key={project.name}
            >
              <h3>{project.name}</h3>
              {project.image && (
                <ImageBorder>
                  <img src={project.image} alt="" />
                </ImageBorder>
              )}
              <p>{project.desc}</p>
              <ViewButton
                whileHover={{ y: -3 }}
                rel="noopener noreferrer"
                target="_blank"
                href={project.to}
              >
                view
              </ViewButton>
            </ProjectListItem>
          ))}
        </ProjectList>
      </Container>
    </StyledProjects>
  )
}

export default Projects

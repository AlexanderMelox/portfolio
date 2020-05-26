import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { Container } from '../components/common'

const StyledProjects = styled.section`
  width: 100%;
  padding: 6vw 0;
  background-image: var(--gradient);
  transform: translateY(calc(96vh - 92px));
`

const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: var(--primary-font-family);
`

const ProjectTag = styled.span`
  font-size: calc(1rem + 1vw);
  letter-spacing: normal;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Dank Mono', sans-serif;
  margin-left: 2rem;
  opacity: 0;
  transition: all 0.2s;
`

const ProjectListItem = styled.li`
  font-size: calc(1.2rem + 3vw);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  &:hover {
    ${ProjectTag} {
      opacity: 1;
      transform: translateY(-2rem);
    }
  }

  a:link,
  a:visited {
    color: var(--text-inverted-dark-a11y);
    padding: 1vh 0;
    display: inline-block;
  }
`

const Projects = () => {
  const projects = useMemo(
    () => [
      {
        name: 'COVID-19 GraphQL',
        to: 'https://github.com/AlexanderMelox/COVID19-GraphQL-Wrapper',
        tags: 'Node && GraphQL',
      },
      {
        name: 'Castle wars',
        to: 'https://github.com/AlexanderMelox/Castle-Wars',
        tags: 'Vuejs',
      },
    ],
    []
  )

  return (
    <StyledProjects>
      <Container>
        <ProjectList>
          {[].map(project => (
            <ProjectListItem>
              <a rel="noopener noreferrer" target="_blank" href={project.to}>
                {project.name}
              </a>
              <ProjectTag>{project.tags}</ProjectTag>
            </ProjectListItem>
          ))}
          <ProjectListItem>
            <a
              rel="noopener noreferrer"
              href="#"
              onClick={e => e.preventDefault()}
              target="_blank"
            >
              👷🏼‍♂️Site is still under construction.
            </a>
          </ProjectListItem>
        </ProjectList>
      </Container>
    </StyledProjects>
  )
}

export default Projects

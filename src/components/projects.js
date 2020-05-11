import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { useHeaderHeight } from '../hooks'

import Container from '../components/common/container'

const StyledProjects = styled.section`
  width: 100%;
  padding: 6vw 0;
  background-color: var(--color);
  transition: background-color 2s ease-in-out;
  transform: translateY(
    calc(96vh - ${({ headerHeight }) => headerHeight + 'px'})
  );
`

const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: var(--primary-font-family);
`

const ProjectListItem = styled.li`
  font-size: calc(1.2rem + 2vw);
  font-weight: 600;
  line-height: 1.2;

  a:link,
  a:visited {
    color: var(--text-inverted-darker);
    padding: 1vh 0;
    display: inline-block;
  }
`

const Projects = () => {
  const projects = useMemo(() => [
    {
      name: 'COVID-19 GraphQL',
      to: 'https://github.com/AlexanderMelox/COVID19-GraphQL-Wrapper',
    },
    {
      name: 'More projects coming soon...',
      to: '#',
    },
  ])

  const headerHeight = useHeaderHeight()

  return (
    <StyledProjects headerHeight={headerHeight}>
      <Container>
        <ProjectList>
          {projects.map(project => (
            <ProjectListItem>
              <a target="_blank" href={project.to}>
                {project.name}
              </a>
            </ProjectListItem>
          ))}
        </ProjectList>
      </Container>
    </StyledProjects>
  )
}

export default Projects

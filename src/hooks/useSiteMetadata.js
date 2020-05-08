import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query getSiteMetadata {
      site {
        siteMetadata {
          author
          description
          title
          socialLinks {
            name
            to
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata

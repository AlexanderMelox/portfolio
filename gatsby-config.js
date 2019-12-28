module.exports = {
  siteMetadata: {
    title: `Alexander Melo`,
    description: `Alexander Melo `,
    author: `Alexander Melo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}

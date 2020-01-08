module.exports = {
  siteMetadata: {
    title: `Alexander Melo | UX engineer at IBM`,
    description: `Alexander Melo | UX Engineer on IBM Hybrid Cloud.`,
    author: `Alexander Melo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}

module.exports = {
  siteMetadata: {
    title: `Alexander Melo | UX Engineer `,
    description: `Hey, I'm Alexander Melo and I'm a UX Engineer at IBM.`,
    author: `Alexander Melo`,
    socialLinks: [
      { name: "Email", to: "mailto:alexandermelox@gmail.com" },
      { name: "Twitter", to: "https://twitter.com/melo_codes" },
      { name: "Github", to: "https://github.com/AlexanderMelox" },
      { name: "Instagram", to: "https://instagram.com/eat.sleep.code" },
      { name: "Twitch", to: "https://twitch.tv/melocodes" },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: `${__dirname}/src/components/layout.js`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
};

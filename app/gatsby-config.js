module.exports = {
  siteMetadata: {
    title: `Montana Free Press`,
    description: `Lawmaker records, bill statuses and votes for the 2019 Montana Legislature.`,
    author: `Eric Dietrich / Montana Free Press`,
    siteUrl:`https://http://www.montanafreepress.org/apps/track-mtleg-2019`,
    keywords: ['Montana','legislature','votes','politics','track record','record','rino','senate','house']
  },
  // pathPrefix: `/apps/track-mtleg-2019`,
  pathPrefix: `/track-mtleg-2019`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MTFP News App: 2019 Montana Legislature`,
        short_name: `MTLeg 2019`,
        start_url: `/`,
        background_color: `#2800d7`,
        theme_color: `#2800d7`,
        display: `minimal-ui`,
        icon: `src/images/mtfp-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-70813941-1",
      },
    },
    `gatsby-plugin-webpack-size`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

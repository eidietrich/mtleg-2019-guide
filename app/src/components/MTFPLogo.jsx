import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import styles from './MTFPLogo.module.css'

const HeroImage = (props) => (
  <StaticQuery
    query={graphql`
      query {
        image: file(relativePath: { eq: "mtfp-logo-letters-only.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <div className={styles.logoContainer}>
            <a href="https://montanafreepress.org">
            <Img
                fluid={data.image.childImageSharp.fluid}
                alt='MTFP logo'
                width='auto'
                className={styles.logo}
            />
            </a>
            <div className={styles.title}>The Montana Free Press</div>
        </div>}
  />
)
export default HeroImage
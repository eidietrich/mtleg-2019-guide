import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

// surprisingly complex - loads all images in image folder then renders based on prop
// see https://noahgilmore.com/blog/easy-gatsby-image-components/
// In future, could segment images folder into categories by directory

const HeroImage = (props) => (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid(maxWidth: 900) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
  
      render={(data) => {
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(props.filename);
        });
        if (!image) { return null; }

        // const imageSizes = image.node.childImageSharp.sizes;
        return (
            <div className="hero-image-container">
                <Img
                    fluid={image.node.childImageSharp.fluid}
                    alt={props.alt}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    className="hero-image"
                />
                <div className="image-credit">{props.credit}</div>
            </div>
        );
      }}
    />
)

export default HeroImage

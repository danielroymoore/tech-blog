import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ fileName, altText }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              extension
              publicURL
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath === fileName
      })

      if (!image) {
        return null
      }

      if (image.node.extension === "svg") {
        return <img src={image.node.publicURL} alt={altText} />
      }

      const imageSizes = image.node.childImageSharp.fluid
      return <Img alt={altText} sizes={imageSizes} />
    }}
  />
)

Image.defaultPropTypes = {
  fileName: "",
  altText: "",
}

Image.propTypes = {
  fileName: PropTypes.string,
  altText: PropTypes.string,
}

export default Image

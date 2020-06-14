import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogList from "../components/blog-list"

const IndexPage = ({ data }) => {
  const blogs = data.allMarkdownRemark.edges.map(edge => {
    const { title, date, summary, path } = edge.node.frontmatter

    return {
      title,
      date,
      summary,
      path,
    }
  })

  return (
    <Layout>
      <SEO title="Blogs" />
      <BlogList title="Blogs" blogs={blogs} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            title
            date
            summary
          }
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogList from "../components/blog-list"
import ContentBlock from "../components/content-block"

const IndexPage = ({ data }) => {
  const blogCount = data.allMarkdownRemark.totalCount
  const blogs = data.allMarkdownRemark.edges.map(edge => {
    const { title, date, summary, path } = edge.node.frontmatter

    return {
      title,
      date,
      summary,
      path,
    }
  })

  const welcomeBody =
    "Quisque quis nibh ligula. Mauris vehicula leo vel lectus volutpat porttitor. Cras ac tristique risus, sed venenatis eros. Duis fringilla mauris quis ornare pretium. Nam placerat egestas ex vel vehicula. Vestibulum luctus risus vitae sem molestie faucibus. Integer quis orci justo."

  return (
    <Layout>
      <SEO title="Home" />
      <ContentBlock body={welcomeBody} />
      <BlogList
        title={`Latest Blogs (3 of ${blogCount})`}
        blogs={blogs}
        showLink
      />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
    ) {
      totalCount
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

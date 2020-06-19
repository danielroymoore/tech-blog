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
    "I'm a UK based Software Engineer whose main focus is on Front End development. Software never stands still, so I have created this blog to keep myself accountable to the goal of always striving to improve, and not becoming complacent."

  return (
    <Layout>
      <SEO title="Home" />
      <ContentBlock body={welcomeBody} />
      <BlogList
        title={`Latest Blogs (${blogs.length} of ${blogCount})`}
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

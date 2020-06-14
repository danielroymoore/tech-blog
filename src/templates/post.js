import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import BlogPost from "../components/blog-post"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Link
        to="/blog"
        style={{
          color: "#fcba04",
          display: "block",
          fontWeight: "bold",
          marginBottom: "8px",
          textDecoration: "none",
        }}
      >
        &#171; Back To Blogs
      </Link>
      <BlogPost title={frontmatter.title} date={frontmatter.date} html={html} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        summary
      }
    }
  }
`

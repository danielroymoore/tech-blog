import React from "react"
import PropTypes from "prop-types"

import blogPostStyles from "./blog-post.module.scss"

const BlogPost = ({ title, date, html }) => (
  <div className={blogPostStyles.container}>
    <h1 className={blogPostStyles.title}>
      {title}: <small>{date}</small>
    </h1>
    <div
      className="blog-post-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
)

BlogPost.defaultProps = {
  title: "",
  date: "",
  html: "",
}

BlogPost.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  html: PropTypes.string,
}

export default BlogPost

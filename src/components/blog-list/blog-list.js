import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import blogListStyles from "./blog-list.module.scss"

const BlogList = ({ title, blogs, showLink }) => (
  <>
    <div className={blogListStyles.header}>
      <h2 className={blogListStyles.heading}>{title}</h2>
      {showLink && (
        <Link to="/blog" className={blogListStyles.ctaLink}>
          <h4>View All</h4>
        </Link>
      )}
    </div>
    {blogs.map(blog => (
      <div key={blog.path} className={blogListStyles.container}>
        <h3 className={blogListStyles.title}>{blog.title}</h3>
        <p className={blogListStyles.summary}>{blog.summary}</p>
        <Link className={blogListStyles.link} to={blog.path}>
          Read More &#187;
        </Link>
      </div>
    ))}
    {showLink && (
      <Link to="/blog" className={blogListStyles.ctaButton}>
        <button>View All</button>
      </Link>
    )}
  </>
)

BlogList.defaultProps = {
  title: "",
  blogs: [],
  showLink: false,
}

BlogList.propTypes = {
  title: PropTypes.string,
  blogs: PropTypes.arrayOf(PropTypes.object),
  showLink: PropTypes.bool,
}

export default BlogList

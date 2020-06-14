import React from "react"
import PropTypes from "prop-types"

import contentBlockStyles from "./content-block.module.scss"

const ContentBlock = ({ title, body }) => (
  <div className={contentBlockStyles.container}>
    {title && <h1 className={contentBlockStyles.title}>{title}</h1>}
    <p className={contentBlockStyles.body}>{body}</p>
  </div>
)

ContentBlock.defaultProps = {
  title: "",
  body: "",
}

ContentBlock.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
}

export default ContentBlock

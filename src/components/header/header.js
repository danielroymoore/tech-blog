import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from "../image"

import headerStyles from "./header.module.scss"

const Header = ({ siteTitle }) => (
  <header>
    <div className={headerStyles.container}>
      <h1 className={headerStyles.h1}>
        <Link to="/" className={headerStyles.link}>
          {siteTitle}
        </Link>
      </h1>

      <div className={headerStyles.socials}>
        <a
          href="https://github.com/danielroymoore"
          target="_blank"
          rel="noreferrer"
        >
          <Image fileName="github.svg" altText="Github Social Icon" />
        </a>
        <a
          href="https://twitter.com/RookPainting"
          target="_blank"
          rel="noreferrer"
        >
          <Image fileName="twitter.svg" altText="Twitter Social Icon" />
        </a>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

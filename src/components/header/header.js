import { Link } from "gatsby"
import React from "react"

import logo from "../../images/logo.svg"
import github from "../../images/github.svg"
import twitter from "../../images/twitter.svg"

import headerStyles from "./header.module.scss"

const Header = () => (
  <header>
    <div className={headerStyles.container}>
      <h1 className={headerStyles.h1}>
        <Link to="/" className={headerStyles.link}>
          <img src={logo} altText="Logo" />
        </Link>
      </h1>

      <div className={headerStyles.socials}>
        <a
          href="https://github.com/danielroymoore"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} altText="Github Social Icon" />
        </a>
        <a
          href="https://twitter.com/RookPainting"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitter} altText="Twitter Social Icon" />
        </a>
      </div>
    </div>
  </header>
)

export default Header

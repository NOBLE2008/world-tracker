import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from './PageNav.module.css'
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link to={'/'}><Logo/></Link>
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li><Link to={'/login'} className={'cta'}>Login</Link></li>
      </ul>
    </nav>
  );
}

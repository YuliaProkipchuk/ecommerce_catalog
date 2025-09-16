import React from "react";
import classes from "./HeaderNavbar.module.scss";
import Link from "next/link";

export function HeaderNavbar() {
  return (
    <ul className={classes.header_nav}>
      <li>
        <Link href="/" className={`${classes.nav_link} ${classes.active}`}>
          home
        </Link>
      </li>
      <li>
        <Link href="/phones" className={classes.nav_link}>
          phones
        </Link>
      </li>
      <li>
        <Link href="/tablets" className={classes.nav_link}>
          tablets
        </Link>
      </li>
      <li>
        <Link href="/accessories" className={classes.nav_link}>
          accessories
        </Link>
      </li>
    </ul>
  );
}
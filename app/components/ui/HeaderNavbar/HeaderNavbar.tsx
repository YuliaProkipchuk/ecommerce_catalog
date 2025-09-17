import React from "react";
import classes from "./HeaderNavbar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNavbar() {
  const pathname = usePathname();
  
  const getPathnameWithoutLocale = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0].length === 2) {
      return '/' + segments.slice(1).join('/');
    }
    return path === '' ? '/' : path;
  };

  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const navItems = [
    { href: "/", label: "home" },
    { href: "/phones", label: "phones" },
    { href: "/tablets", label: "tablets" },
    { href: "/accessories", label: "accessories" },
  ];

  return (
    <ul className={classes.header_nav}>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`${classes.nav_link} ${pathWithoutLocale === item.href ? classes.active : ''}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

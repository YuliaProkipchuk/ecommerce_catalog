"use client";

import React, { useState } from "react";
import classes from "./Header.module.scss";
import headerLogo from "@/public/icons/headerLogo.svg";
import Link from "next/link";
import Image from "next/image";
import { HeaderNavbar } from "../ui/HeaderNavbar/HeaderNavbar";
import { HeaderActions } from "../ui/HeaderActions.tsx/HeaderActions";
import { BurgerMenu } from "../ui/BurgerMenu/BurgerMenu";

export function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header_content}>
          <Link href="/" className={classes.logo}>
            <Image
              src={headerLogo}
              width={64}
              height={22}
              alt="Nice Gadgets logo"
            />
          </Link>
          <HeaderNavbar />
          <HeaderActions toggleBurgerMenu={toggleBurgerMenu} />
        </div>
      </header>
      {isBurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </>
  );
}

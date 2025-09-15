import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImg from "@/public/logo.svg";

export function Logo() {
  return (
    <Link href="/">
      <Image src={LogoImg} width={89} height={32} alt="Nice Gadgets logo" />
    </Link>
  );
}

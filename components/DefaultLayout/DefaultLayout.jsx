import React from "react";
import Link from "next/link";
import Head from "next/head";
import { UI_HOME, UI_ABOUT } from "../../constants/routes";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import s from "./DefaultLayout.module.css";

export const DefaultLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Погода</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.DefaultLayout__header}>
        <WbSunnyTwoToneIcon fontSize="large" />
        <Link href={UI_HOME}>
          <a className={s.DefaultLayout__button}>Погода в мире</a>
        </Link>
        <Link href={UI_ABOUT}>
          <a className={s.DefaultLayout__button}>О приложении</a>
        </Link>
      </div>
      <main className={s.DefaultLayout__content}>{children}</main>
    </>
  );
};

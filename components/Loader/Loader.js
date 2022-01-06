import React from "react";
import Image from "next/image";
import s from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={s.Loader}>
      <div className={s.Loader__block}>
        <div className={s.Loader__image}>
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src="/loader.svg"
            alt=""
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

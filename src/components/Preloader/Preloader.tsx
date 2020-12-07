import React, { FC } from "react";

import styles from "./preloader.module.scss";

export const Preloader: FC = () => {
  return <div className={styles.preloader}>Загрузка...</div>;
};

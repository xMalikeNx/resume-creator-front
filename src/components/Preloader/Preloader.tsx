import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';

import { randomInteger } from '../../utils/randomInteger';

import styles from './preloader.module.scss';

const loadingParts = [
  'L',
  'Lo',
  'Loa',
  'Load',
  'Loadi',
  'Loadin',
  'Loading',
  'Loading.',
  'Loading..',
  'Loading...',
];

export type TPreloader = HTMLAttributes<HTMLDivElement>;

export const Preloader: FC<TPreloader> = ({ className, ...props }) => {
  const [content, setContent] = useState('L');
  const [partsIndex, setPartsIndex] = useState(1);
  const [filled, setFilled] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (partsIndex === loadingParts.length && !filled) {
        setFilled(true);
        setPartsIndex(0);
        return;
      }

      if (filled) {
        setFilled(false);
      }

      setContent(loadingParts[partsIndex]);
      setPartsIndex(partsIndex + 1);
    }, randomInteger(100, 400));

    return () => {
      clearInterval(interval);
    };
  }, [filled, partsIndex, setPartsIndex, setFilled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div {...props} className={classNames(styles.preloader, className)}>
      <div className={classNames(filled && styles.filled)}>
        {content}
        {showCursor && '|'}
      </div>
    </div>
  );
};

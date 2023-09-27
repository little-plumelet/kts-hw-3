import cn from 'classnames';
import * as React from 'react';
import Button from '@components/Button';
import Text from '@components/Text';
import { TextViewType } from '@customTypes/common';
import styles from './styles.module.scss';

type WinePairingProps = {
  pairedWines: string[];
  className?: string;
};
export const WinePairing: React.FC<WinePairingProps> = ({ pairedWines, className }) => {
  return (
    <section className={cn(styles['wine-section'], className)}>
      <Text view={TextViewType.p20}>Wine Pairing</Text>
      <ul className={styles['wine-section-list']}>
        {pairedWines.map((wine) => (
          <li key={wine} className={styles['wine-section-list-point']}>
            <Button className={styles.wine}>{wine.charAt(0).toUpperCase() + wine.slice(1)}</Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

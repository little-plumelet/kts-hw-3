import cn from 'classnames';
import * as React from 'react';
import { createPortal } from 'react-dom';
import Button from '@components/Button';
import Text from '@components/Text';
import { TextViewType } from '@customTypes/common';
import { RecommendedWineModal } from '../RecommendedWineModal';
import styles from './styles.module.scss';

type WinePairingProps = {
  pairedWines: string[];
  className?: string;
};
export const WinePairing: React.FC<WinePairingProps> = ({ pairedWines, className }) => {
  const [showModal, setShowModal] = React.useState(false);

  function handleOpen() {
    setShowModal((prev) => !prev);
    window.scrollTo(0, 0);
  }

  function handleClose() {
    setShowModal(false);
    window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <section className={cn(styles['wine-section'], className)}>
      <Text view={TextViewType.p20}>Wine Pairing</Text>
      <ul className={styles['wine-section-list']}>
        {pairedWines.map((wine) => (
          <li key={wine} className={styles['wine-section-list-point']}>
            <Button className={styles.wine} onClick={handleOpen}>
              {wine.charAt(0).toUpperCase() + wine.slice(1)}
            </Button>
          </li>
        ))}
      </ul>
      {showModal && createPortal(<RecommendedWineModal onClose={handleClose} />, document.body)}
    </section>
  );
};

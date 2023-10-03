import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { createPortal } from 'react-dom';
import Button from '@components/Button';
import { ErrorCp } from '@components/ErrorCp';
import Text from '@components/Text';
import { useLocalStore } from '@customHooks/useLocalStore';
import { TextViewType } from '@customTypes/common';
import { LoadingState } from '@store/local/MetaModelStore';
import RecommendedWineStore from '@store/local/RecommendedWineStore';
import { RecommendedWineModal } from '../RecommendedWineModal';
import styles from './styles.module.scss';

type WinePairingProps = {
  pairedWines: string[];
  className?: string;
};
export const WinePairing: React.FC<WinePairingProps> = observer(({ pairedWines, className }) => {
  const recommendedWinesStore = useLocalStore(() => new RecommendedWineStore());

  function handleOpen(query: string) {
    recommendedWinesStore.fetchRecommendedWineData(query);
  }

  function handleClose() {
    recommendedWinesStore.meta.setNotStarted();
    window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <section className={cn(styles['wine-section'], className)}>
      <Text view={TextViewType.p20}>Wine Pairing</Text>
      <ul className={styles['wine-section-list']}>
        {pairedWines.map((wine) => (
          <li key={wine} className={styles['wine-section-list-point']}>
            <Button className={styles.wine} onClick={() => handleOpen(wine)}>
              {wine.charAt(0).toUpperCase() + wine.slice(1)}
            </Button>
          </li>
        ))}
        {!pairedWines.length && <>No recommended wines</>}
      </ul>
      {recommendedWinesStore.meta.state === LoadingState.error && (
        <ErrorCp errorMessage={recommendedWinesStore.error} />
      )}
      {recommendedWinesStore.meta.state === LoadingState.success &&
        createPortal(
          <RecommendedWineModal onClose={handleClose} recommendedWines={recommendedWinesStore.recommendedWineData} />,
          document.body,
        )}
    </section>
  );
});

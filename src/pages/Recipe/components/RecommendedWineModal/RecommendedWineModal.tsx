import * as React from 'react';
import Button from '@components/Button';
import Card from '@components/Card';
import { Star } from '@components/icons/Star';

import { RecommendedWineData } from '@customTypes/RecommendedWineData';
import styles from './styles.module.scss';

type RecommendedWineModalProps = {
  onClose: () => void;
  recommendedWines: RecommendedWineData[];
};
export const RecommendedWineModal: React.FC<RecommendedWineModalProps> = ({ onClose, recommendedWines = [] }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.modal}>
      <Button onClick={onClose} className={styles['modal-button']}>
        x
      </Button>
      <div className={styles['wine-list']}>
        {recommendedWines.map((wine) => (
          <Card
            key={wine.id}
            title={wine.title}
            image={wine.imageUrl}
            subtitle={wine.description}
            contentSlot={wine.price.substring(0, wine.price.indexOf('.') + 3)}
            actionSlot={
              <div>
                {new Array(Math.round(wine.ratingCount) > 5 ? 5 : Math.round(wine.ratingCount))
                  .fill(1)
                  .map((_, index) => (
                    <Star key={index} className={styles.star} />
                  ))}
              </div>
            }
            className={styles.card}
          ></Card>
        ))}
      </div>
      <Button onClick={() => window.scrollTo(0, 0)} className={styles['modal-button']}>
        &uarr;
      </Button>
    </div>
  );
};

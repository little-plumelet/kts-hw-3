import * as React from 'react';
import Button from '@components/Button';
import Card from '@components/Card';
import { Star } from '@components/icons/Star';
import data from './mockData.json';
import styles from './styles.module.scss';

type RecommendedWineModalProps = {
  onClose: () => void;
};
export const RecommendedWineModal: React.FC<RecommendedWineModalProps> = ({ onClose }) => {
  const recommendedWines = data.recommendedWines;

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
            contentSlot={wine.price}
            actionSlot={
              <div>
                {new Array(Math.round(wine.ratingCount)).fill(1).map((_, index) => (
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
